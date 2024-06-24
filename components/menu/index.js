import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menus = [
   { path: '/', title: 'Home' },
   { path: '/users', title: 'Users' },
   { path: '/profile', title: 'Profile' },
   { path: '/notes', title: 'Notes' },
   { path: '/posts', title: 'Posts' },
]

const Menu = () => {
   const { pathname } = useRouter();

   const bgActive = useCallback((path) => {
      return path === pathname ? "bg-blue-300 font-bold" : ""
   },[[pathname]])

   return (
      <div>
         {menus.map((d, id) => (
            <div key={"menus-" + id} className='inline-block'>
               <Link href={d.path} className={bgActive(d.path)}>
                  {d.title}
               </Link>
               {id < menus.length - 1  && <> | &nbsp; </>}
            </div>
         ))}
      </div>
   )
}

export default Menu;