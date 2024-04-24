'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function UserTabs({admin}) {
    const path = usePathname();
 return(
    <div className="flex justify-center mx-auto gap-2 tabs">
                
                <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}> Profile</Link>
                {admin && (
                    <>
                    <Link className={path === '/categories' ? 'active' : ''}  href={'/categories'}> Categories</Link>
                    <Link className={path.includes('menu-items') ? 'active' : ''}  href={'/menu-items'}> Menu Items</Link>
                    <Link className={path.includes('/users') ? 'active' : ''} href={'/users'}> User</Link>
                    <Link className={path === '/orders' ? 'active' : ''} href={'/orders'}> Order</Link>
                    </>
                )}
               
                
               
            </div>
 );
}