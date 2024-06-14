import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = () => {
   const { pathname } = useRouter();

   const bgActive = useCallback((path) => {
      return path === pathname ? "bg-blue-300 font-bold" : ""
   },[[pathname]])

   return (
      <div>
         <Link href='/' className={bgActive("/")}>Home</Link> | &nbsp; 
         <Link href='/profile' className={bgActive("/profile")}>Profile</Link>
      </div>
   )
}

export default Menu;