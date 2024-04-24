'use client';
import { UseProfile } from "@/components/UseProfile";
import Link from 'next/link';
import UserTab from "@/components/layout/UserTab";
import Right from "@/components/icon/Right";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
    const { loading, data } = UseProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(menuItems => {
                setMenuItems(menuItems);
            })
            .catch(error => console.error('Error fetching menu items:', error));
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an Admin';
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTab admin={true}/>
            <div className="mt-8 ">
                <Link href="/menu-items/new">
                    <div className="button flex">
                        <span>Create new menu item</span>
                        <Right/>
                    </div>
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-4">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
    {/* Sử dụng gap-2 để tạo khoảng trống */}
    {menuItems?.length > 0 && menuItems.map(item => (
        <Link href={`/menu-items/edit/${item._id}`} className="mb-2 button flex-col" key={item._id}>
            <div className="flex flex-col items-center"> {/* Thay đổi thành flex-col */}
                <div>
                    {item.image || localStorage.getItem(`${item._id}_selectedImage`) ? (
                        <img src={item.image || localStorage.getItem(`${item._id}_selectedImage`)} alt={item.name} className="w-12 h-12 mr-2 rounded-md" />
                    ) : (
                        <div className="w-12 h-12 mr-2 rounded-md bg-gray-200"></div>
                    )}
                </div>
                <div> {/* Đưa tên vào div mới */}
                    <span>{item.name}</span>
                </div>
            </div>
        </Link>
    ))}
</div>

            </div>
        </section>
    );
}
