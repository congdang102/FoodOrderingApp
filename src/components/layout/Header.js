'use client';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icon/ShoppingCart";
export default function Header () {
   const session = useSession();
   console.log(session);
   const status = session?.status;
   const userData = session.data?.user;

   let userName = userData?.name || userData?.email;
   const {cartProducts} = useContext(CartContext);
    if(userName &&  userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }
    return (
        <header className="flex items-center justify-between">
            <nav className="flex gap-8 text-gray-500 font-semibold items-center">
                <Link href={'/'} className="text-red-500 font-semibold text-2xl">ST Banh mi</Link>
                <Link href={'/'} >Home</Link>
                <Link href={'/menu'} >Menu</Link>
                <Link href={'/#about'} >About</Link>
                <Link href={'/#contact'} >Contact</Link>
               
            </nav>
            <nav className="flex gap-4 text-gray-500 font-semibold items-center">
                {status === 'authenticated' && (
                        <>
                        <Link href={'/profile'} className="whitespace-nowrap">Hello, {userName}</Link>
                           <button  
                         onClick={() => signOut()}
                          className="bg-red-500 rounded-full px-8 py-2 
                         text-white">
                             Logout
                             </button>
                        </>
                      
                )}
                {status === 'unauthenticated' && (
                    <>
                      <Link href={'/login'} >Login</Link>
                <Link href={'/register'} className="bg-red-500 rounded-full px-8 py-2 
                text-white">
                    Register
                    </Link>
                    </>
                )}
            
                <Link href={'/cart'} className="relative">
                    <ShoppingCart/>
                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs py-1 px-1 rounded-full leading-3"> {cartProducts.length}</span>
                    </Link>
            
            
                
            </nav>
        </header>
    );
}