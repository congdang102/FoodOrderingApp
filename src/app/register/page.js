"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser,setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    async function HandleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);  
      const response = await  fetch('/api/register', {
                method: "POST",
                body: JSON.stringify({email,password}),
                headers: {'Content-Type': 'application/json'},
    
            });
            if(response.ok) {
                setUserCreated(true);
            }
            else {
                setError(true);
            }
           
            setCreatingUser(false);
    }
    return (
        <section className="mt-8">
        <h1 className="text-center text-red-500 text-4xl">
            Register
        </h1>
        {
            userCreated && (
                <div className="my-4 text-center">
                    User created. <br/> Now you can login {''} <Link className="underline" href={'/login'}> 
                    Login &raquo;</Link>
                </div>
            )
        } 
        {
            error && (
                <div className="my-4 text-center">
                    A error has occurred.<br/>
                    Please try again later
                </div>
            )
        }
        <form className="block max-w-xs mx-auto" onSubmit={HandleFormSubmit}>
            <input type="email" placeholder="Email" value={email}
                disabled={creatingUser}
                onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" placeholder="Password" value={password}
            disabled={creatingUser}
            onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit" disabled={creatingUser}>
                Register
                </button>
            <div className="my-4 text-gray-300 text-center">                   
                or login with provider
            </div>
            <button onClick={() => signIn('google',{callbackUrl: '/'})}  className="flex gap-4 items-center justify-center">
                <Image src={'/goole.png'} alt={'sss'} width={32} height={32}/>
               
                <span>Login with Google</span>
            </button>
            <div className="text-center my-4 text-gray-500 border-t pt-4">
                Existing account? <Link className="underline " href={'/login'}>Login here &raquo;</Link>
            </div>
        </form>
    </section>
    );
}