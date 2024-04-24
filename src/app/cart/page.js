'use client';
import SectionHeader from '@/components/layout/SectionHeader';
import {CartContext} from '@/components/AppContext';
import {cartProductPrice} from '@/components/AppContext';
import { useContext, useEffect, useState } from 'react';
import Trash from "@/components/icon/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import {UseProfile} from "@/components/UseProfile";
export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const {data: profileData} = UseProfile();
    const [streetAddress, setStreetAddress] = useState(profileData?.address || '');

   

    useEffect(() => {
        if(profileData?.city) {
            const {phone, streetAddress,city,postalCode, country}= profileData;
            const addressFromProfile = {phone, streetAddress,city,postalCode, country};
            setStreetAddress(addressFromProfile);
        }
    }, [profileData]);

    let total = 0;
    function handleAddressChange(propName,value) {
       
       setStreetAddress(prevAddress => ({...prevAddress,[propName]:value}));  
    }
    for(const p of cartProducts) {
        total += cartProductPrice(p);
    }
    return(
        <section className="mt-8">
            <div className='text-center'>
            <SectionHeader mainHeader="Cart"/>
            </div>
            
            <div className=" mt-8 grid gap-8 grid-cols-2">
                <div >
                {cartProducts?.length === 0 && (
                        <div>
                            No product in your shopping cart
                        </div>
                    )}
                    {cartProducts?.length > 0  && cartProducts.map((product,index) => (
                        <div key={product._id} className="flex gap-4 mb-2 border-b items-center py-2">
                            <div >
                            {product.image || localStorage.getItem(`${product._id}_selectedImage`) ? (
                        <img src={product.image || localStorage.getItem(`${product._id}_selectedImage`)} alt={product.name} className="w-24 h-24 mr-2 rounded-md" />
                    ) : (
                        <div className="w-12 h-12 mr-2 rounded-md bg-gray-200"></div>
                    )}
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm text-gray-700">
                                        Size: <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras?.length >0 && (
                                    <div className="text-sm text-gray-500">
                                        Extra: 
                                        {product.extras.map(extras => (
                                            <div key={product._id}>
                                                {extras.name} ${extras.price}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                               ${cartProductPrice(product)}
                            </div>
                           <div className="ml-2">
                            <button onClick={() => removeCartProduct(index)} className="p-2" type="button"> <Trash/></button>
                           </div>
                        </div>
                    ))}
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-500"> SubTotal:</span>
               
               <span className="font-semibold text-lg"> ${total}</span>
              
                </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form >
                    <AddressInputs 
                    addressProps={streetAddress} 
                    setAddressProp={handleAddressChange}
                />
                        <button type="submit">Pay ${total}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}