'use client';
import { useState } from "react";
import { UseProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from "@/components/icon/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
export default function NewMenuItemPage() {
    const { loading, data } = UseProfile();
    const [menuItem, setMenuItem] = useState({});
    async function handleFormSubmit(data) {
        const savingPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/menu-items', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    
        await toast.promise(savingPromise, {
            loading: 'Saving menu items...',
            success: 'Successfully saved',
            error: 'Error while saving',
        });
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
        </section>
    );
}
