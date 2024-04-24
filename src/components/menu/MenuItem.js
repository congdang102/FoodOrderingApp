import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItemTile from "./MenuItemTile";

export default function MenuItem({ item }) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } = item;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
    } else {
      addToCart(item, selectedSize, selectedExtras);
      setShowPopup(false);
      toast.success('Add to Cart!');
    }
  }

  function handleExtraThingClick(extraThing) {
    if (selectedExtras.includes(extraThing)) {
      setSelectedExtras(prevExtras => prevExtras.filter(extra => extra !== extraThing));
    } else {
      setSelectedExtras(prevExtras => [...prevExtras, extraThing]);
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  selectedExtras.forEach(extra => {
    selectedPrice += extra.price;
  });

  return (
    <>
      {showPopup && (
        <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div onClick={ev => ev.stopPropagation()} className="my-8 bg-white p-4 rounded-lg max-w-md"> 
            <div className="overflow-y-scroll p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
              {image || localStorage.getItem(`${item._id}_selectedImage`) ? (
                <img
                  src={image || localStorage.getItem(`${item._id}_selectedImage`)}
                  className="h-32 w-auto mx-auto mb-4 rounded-md"
                  alt={name}
                />
              ) : (
                <div className="w-12 h-12 mr-2 rounded-md bg-gray-200"></div>
              )}
              <h2 className="text-lg font-bold text-center mb-4">{name}</h2>
              <p className="text-center text-gray-500 text-sm">{description}</p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map(size => (
                    <label key={size.name} className="flex items-center gap-2 py-4 rounded-md mb-1 border">
                      <input 
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio" 
                        name="size" value=""
                      /> {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map(extraThing => (
                    <label key={extraThing.name} className="flex items-center gap-2 py-4 rounded-md mb-1 border">
                      <input 
                        onClick={() => handleExtraThingClick(extraThing)}
                        type="checkbox" 
                        checked={selectedExtras.includes(extraThing)}
                        name={extraThing.name} 
                        value=""
                      /> 
                      {extraThing.name} + ${extraThing.price}
                    </label>
                  ))}
                  <button className="bg-red-500 stick bottom-2" onClick={handleAddToCartButtonClick} type="button">Add to cart ${selectedPrice}</button>
                  <button className="mt-2" onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} item={item} />
    </>
  );
}
