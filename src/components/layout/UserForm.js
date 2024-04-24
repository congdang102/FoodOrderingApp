import Image from "next/image";
import { useEffect, useState } from "react";
import { UseProfile } from "@/components/UseProfile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.address || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: loggedInUserData } = UseProfile();
    const [saving, setSaving] = useState(false);
    
    function handleAddressChange(propName,value) {
        if(propName === 'phone') setPhone(value);
        if(propName === 'streetAddress') setStreetAddress(value);
        if(propName === 'postalCode') setPostalCode(value);
        if(propName === 'city') setCity(value);
        if(propName === 'country') setCountry(value);
        
    }
    // Trong useEffect
    useEffect(() => {
        const savedImage = localStorage.getItem(`${user.email}_selectedImage`);
        if (savedImage) {
            setSelectedImage(savedImage);
        } else {
            if (loggedInUserData && user && loggedInUserData.email === user.email) {
                setSelectedImage(user?.image || ''); // Sử dụng ảnh từ Cloudinary đã lưu trữ trong cơ sở dữ liệu nếu là người dùng hiện tại
            }
        }
    }, [loggedInUserData, user]);

    // Trong handleImageChange
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
            localStorage.setItem(`${user.email}_selectedImage`, reader.result); // Lưu URL của ảnh vào localStorage
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ensure to prevent default here
        setSaving(true);
    
        try {
            let cloudinaryUrl = null;
            if (selectedImage && !selectedImage.startsWith("http")) {
                const formData = new FormData();
                formData.append("file", selectedImage);
                formData.append("upload_preset", "Images");
    
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dojisddoa/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );
    
                const data = await response.json();
                cloudinaryUrl = data.secure_url;
            }
    
            onSave({
                name: userName,
                address: streetAddress,
                phone,
                admin,
                postalCode,
                city,
                country,
                image: cloudinaryUrl || selectedImage,
            });
    
            setSaving(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            setSaving(false);
            toast.error('An error occurred while saving profile. Please try again later.');
        }
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
                        <Image className="rounded-lg  mb-1" src={user?.image || '/default-avatar.png'} width={250} height={250} alt="Avatar" />
                    )}
                    <label>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <span className="block border border-gray-300 rounded-lg text-center p-2 cursor-pointer">Edit</span>
                    </label>
                </div>
            </div>

            <form className="grow" onSubmit={handleSubmit}>
                <label>First and last name</label>
                <input type="text" placeholder="First and last" value={userName} onChange={ev => setUserName(ev.target.value)} />
                <label htmlFor="">Email</label>
                <input type="email" disabled={true} placeholder={'email'} value={user.email}/>
                <AddressInputs 
                    addressProps={{ phone, streetAddress, postalCode, city, country }} 
                    setAddressProp={handleAddressChange}
                />

                {loggedInUserData.admin && (
                    <div>
                        <label htmlFor="adminCb" className="p-2 inline-block items-center gap-2 mb-2">
                            <input type="checkbox" id="adminCb" className="mr-2" value={'1'} checked={admin} onChange={ev => setAdmin(ev.target.checked)} />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">{saving ? "Saving..." : "Save"}</button>
            </form>
        </div>
    );
}
