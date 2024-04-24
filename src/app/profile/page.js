'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import UserForm from "@/components/layout/UserForm";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTab";
import { toast } from 'react-toastify';

export default function Profile () {
    const session = useSession();
    const [user,setUser] = useState(null);
    const [saved,setSaved] = useState(false);
    const [saving,setSaving] = useState(false);
    const [admin,setAdmin] = useState(false);
   
    const [profileFetched, setProfileFetched] = useState('');
    const {status} = session;
    useEffect(() => {
        if(status === 'authenticated') {
           
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session,status]);
    
   

    async function handleProfileInfoUpdate(data) {
        setSaved(false);
        setSaving(true);

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data }),
            });

            setSaving(false);

            if (response.ok) {
                setSaved(true);
                toast.success('Profile saved successfully!');
            } else {
                toast.error('Failed to save profile. Please try again later.');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('An error occurred while saving profile. Please try again later.');
        }
    }

    
   
    

    if(status === 'loading' || !profileFetched){
        return 'Loading....';
    }
    if(status === 'unauthenticated') {
        return redirect('/login');
    }
    
    return (
        <section className="mt-8">
            <UserTabs admin={admin}/>
       
        <div className="max-w-lg mx-auto mt-8">
            {/* {saved && (
             <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-100">Profile saved!</h2>
            )}
              {saving && (
             <h2 className="text-center bg-green-100 p-4 rounded-lg border border-blue-100">Profile saving!</h2>
            )} */}
            <UserForm user={user} onSave={handleProfileInfoUpdate} admin={admin} />

           
          
        </div>
        </section>
    );
}