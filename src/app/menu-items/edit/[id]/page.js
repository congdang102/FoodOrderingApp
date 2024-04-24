'use client';
import { useEffect, useState } from "react";
import { UseProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from "@/components/icon/Left";
import DeleteButton from "@/components/DeleteButton";
import { useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
export default function EditMenuItemPage() {
    const [menuItem, setMenuItems] = useState(null);
    const {id} = useParams();
    const { loading, data } = UseProfile();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [redirectToItem, setRedirectToItem] = useState(false);
    const [basePrice, setBasePrice] = useState('');
    

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items =>{
                const item = items.find(i =>  i._id === id);
                setMenuItems(item);
            });
        })
    }, []);


    async function handleFormSubmit(data) { // Loại bỏ tham số ev
        data = { ...data, _id: id, image: data.image || menuItem.image };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                // setName('');
                // setDescription('');
                // setBasePrice('');
                resolve();
                window.location.href = '/menu-items';
            } else {
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: 'Saving menu items...',
            success: 'Successfully saved',
            error: 'Error while saving',
        });
    }
    
    
    // if(redirectToItem) {
    //     return redirect('/menu-items');
    // }
    async function handleDeleteClick() {
       const response = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
        })
        if (response.ok) {
            window.location.href = '/menu-items';
        }
    }
    if (loading) {
        return 'Loading user info...';
    }
    if (!data.admin) {
        return 'Not an admin';
    }
    return (
        <section className="mt-8">
            <UserTab admin={true} />
            <div className="mt-8  max-w-lg mx-auto">
                <Link className="button flex" href={'/menu-items'}>
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
           <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
            <div className="max-w-md mx-auto mt-2">
                <div className=" max-w-xs ml-auto pl-4">

                    <DeleteButton label="Delete this menu item"
                        onDelete={handleDeleteClick}
                    />

              
                </div>
            
            </div>
           
        </section>
    );
}