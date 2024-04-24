
'use client';

import UserTab from "@/components/layout/UserTab";
import { UseProfile } from "@/components/UseProfile";
import  toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = UseProfile();
    const [editCategory, setEditCategory] = useState(null);
    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories')
            .then(res => res.json())
            .then(categories => {
                setCategories(categories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const createPromise = new Promise(async (resolve,reject) => {
            const data = { name:categoryName };
            if(editCategory) {
                data._id = editCategory._id
            }
            
            const response = await fetch('/api/categories', {
                method: editCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            if(response.ok)
                resolve();
            else
                reject();
        });
       
           await toast.promise(createPromise, {
                loading: editCategory
                            ? 'Update cateogry...'
                            : 'Creating your new category...',
                success: editCategory ? 'Category update' : 'Category created',
                error: 'Error, sorry ',
           });
    }

   async function handleDeleteClick(_id) {
          const response=  await fetch('/api/categories?_id='+ _id, {
                method: 'DELETE'
            });
          fetchCategories();
    }

    if (profileLoading) {
        return 'Loading user info...';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTab admin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end ">
                    <div className="grow">
                        <label > 
                            {editCategory ? 'Update category ' : 'New category name' }
                            {editCategory && (
                                <><b>{editCategory.name}</b></>
                            )}
                            </label>
                        <input type="text" name="" value={categoryName} onChange={ev => setCategoryName(ev.target.value)} />
                    </div>
                    <div className="pb-2 flex gap-1">
                        <button type="submit">{editCategory ? 'Update' : 'Create' }</button>
                        <button type="" onClick={() => {
                            setEditCategory(null);
                            setCategoryName('');
                        }
                        
                    }
                        >Cancle</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 test-sm text-gray-500">Edit category: </h2>
                {categories?.length > 0 && categories.map(c => (
    <div key={c.id} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2 items-center">
        <div className="grow">{editCategory !== c ? c.name : (
            <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)} />
        )}</div>
        <div className="flex gap-1">
            <button type="button" onClick={() => {
                setEditCategory(c);
                setCategoryName(c.name);
            }}>Edit</button>
            {/* <button type="button" onClick={() => handleDeleteClick(c._id)}>Delete</button> */}
            <DeleteButton label="Delete"
                        onDelete={() => handleDeleteClick(c._id)}
                    />
        </div>
    </div>
))}

            </div>
        </section>
    );
}