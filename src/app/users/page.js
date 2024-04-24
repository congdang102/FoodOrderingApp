
'use client';

import UserTab from "@/components/layout/UserTab";
import { UseProfile } from "@/components/UseProfile";
import {  useEffect, useState } from "react";
import Link from 'next/link';
export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const { loading: profileLoading, data: profileData } = UseProfile(); // Sửa thành 'useProfile' ở đây

    useEffect(()=> {
        fetch('/api/users').then(response => {
            response.json().then(users =>  {
                setUsers(users);
            });
        })
    },[]);

    if (profileLoading) {
        return 'Loading user info...';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }
    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTab admin={true}/>
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div key={user.id} className="bg-gray-100 rounded-lg mb-2 p-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-900">
                                {user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic"> No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                       
                      
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                    </div>
                
                ))}
            </div>
        </section>
    );
}
