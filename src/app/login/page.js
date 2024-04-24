'use client'
import { useState } from "react";
import Image from "next/image";
import { signIn } from 'next-auth/react';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
     
    async function handleFormSubmit(ev) {
    
        ev.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials',{email,password, callbackUrl: '/'});
        setLoginInProgress(false);
    }
    return(
        <section className="mt-8">
             <h1 className="text-center text-red-500 text-4xl">
            Login
        </h1>
        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="Email" value={email}
               disabled={loginInProgress}
                onChange={ev => setEmail(ev.target.value)}/>
        <input type="password" name="password" placeholder="Password" value={password}
            disabled={loginInProgress}
            onChange={ev => setPassword(ev.target.value)}/>
            <button disabled={loginInProgress} type="submit"> Login</button>
            <div className="my-4 text-gray-300 text-center">                   
                or login with provider
            </div>
            <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}  className="flex gap-4 items-center justify-center">
                <Image src={'/goole.png'} alt={'sss'} width={32} height={32}/>
               
                <span>Login with Google</span>
            </button>
        </form>
        </section>
    );
}