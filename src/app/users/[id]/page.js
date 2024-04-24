'use client';
import UserTab from "@/components/layout/UserTab";
import { UseProfile } from "@/components/UseProfile";
import UserForm from '@/components/layout/UserForm'
import {  useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { toast } from 'react-toastify';

export default function EditUserPage() {
    const { loading: profileLoading, data: profileData } = UseProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
            res.json().then(user => { // Chỉnh sửa ở đây
                setUser(user);
            }).catch(error => {
                console.error('Error fetching users:', error);
            });
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    
    async function handleSaveButtonClick(data) {
        try {
            toast.info('Saving...');
    
            const formData = new FormData();
            if (data.image && !data.image.startsWith('http')) {
                formData.append('file', data.image);
                formData.append('upload_preset', 'Images');
    
                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/dojisddoa/image/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
    
                if (response.ok) {
                    const cloudinaryData = await response.json();
                    data.image = cloudinaryData.secure_url;
                } else {
                    throw new Error('Image upload failed.');
                }
            }
    
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
    
            if (response.ok) {
                toast.success('Saved successfully!');
            } else {
                throw new Error('Save failed.');
            }
        } catch (error) {
            toast.error('Save failed. Please try again later.');
        }
    }
    
    
    
    
   
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
            <UserForm user={user} onSave={handleSaveButtonClick} />

            </div>
        </section>
    );
}
