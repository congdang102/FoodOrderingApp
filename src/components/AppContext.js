'use client';
import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { toast } from "react-toastify";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice || 0; // Default base price to 0 if undefined
  if (cartProduct.size) {
    price += cartProduct.size.price || 0; // Add size price if available
  }
  if (cartProduct.extras?.length > 0) { // Check if extras exist and have length
    for (const extra of cartProduct.extras) {
      price += extra.price || 0; // Add extra price for each extra
    }
  }
  return price;
}


export const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  // Typo correction: Change 'underfined' to 'undefined'
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
        setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  },[])

  function saveCartProductsToLocalStorge(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function clearClear() {
    setCartProducts([]);
    saveCartProductsToLocalStorge([]);
  }
  function removeCartProduct(indexToRemove) {
    setCartProducts(preCartProducts => {
        const newCartProducts = preCartProducts
        .filter((v,index) => index !==  indexToRemove);
        saveCartProductsToLocalStorge(newCartProducts);
        
        return newCartProducts;
    });
    toast.success('Product removed');
  }



  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorge(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{ 
        cartProducts, 
        setCartProducts, 
        addToCart,removeCartProduct,clearClear,
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default AppProvider;
