import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";

export default function MenuItem({ onSubmit, menuItem }) {
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Thay đổi giá trị mặc định của selectedImage

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
        const savedImage = localStorage.getItem(`${menuItem._id}_selectedImage`); // Sử dụng _id của menuItem để lưu ảnh
        setSelectedImage(savedImage || menuItem?.image || null); // Sử dụng URL ảnh từ localStorage hoặc menuItem
    }, [menuItem]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Images");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dojisddoa/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            setSelectedImage(data.secure_url);
            localStorage.setItem(`${menuItem._id}_selectedImage`, data.secure_url); // Lưu URL của ảnh vào localStorage
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error('An error occurred while uploading image. Please try again later.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedImage) {
            toast.error('Please select an image.');
            return;
        }
        onSubmit({
            name,
            description,
            basePrice,
            sizes,
            extraIngredientPrices,
            category,
            image: selectedImage
        });
    };
    

    return (
        <div className="flex gap-4">
        <ToastContainer />
        <div>
            <div className="p-2 rounded-lg relative">
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        className="rounded-lg mb-1 uploaded-image"
                        alt="Selected"
                    />
                ) : (
                    <div className="rounded-lg mb-1 w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No image selected</span>
                    </div>
                )}

                <label>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <span className="block border border-gray-300 rounded-lg text-center p-2 cursor-pointer">Edit</span>
                </label>
            </div>
        </div>

            <form onSubmit={handleSubmit} className="grow">
                <div className="flex gap-2 items-start">
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                        <label>Description</label>
                        <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
                        <label>Category</label>
                        <select value={category} onChange={ev => setCategory(ev.target.value)}>
                            {categories?.length > 0 && categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <label>Base price</label>
                        <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />
                        <MenuItemPriceProps name={'Sizes'} addLable={'Add item sizes'} props={sizes} setProps={setSizes}/>
                        <MenuItemPriceProps name={'Extra ingredients'} addLable={'Add ingredient prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices}/>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
