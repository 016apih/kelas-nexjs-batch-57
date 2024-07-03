import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/service';

const Header = async () => {
   const session = await getServerSession(authOptions) as any;

   return (
      <div className='flex justify-center items-center h-20 font-[400] gap-x-5 border-b-2 border-b-black text-[32px] text-black'>
         <div className='flex-auto text-center'>
            <Link href='/task' className='mx-2'>Task</Link>
            { session?.role === "USER" &&
               <Link href='/profile' className='mx-2'>Profile</Link>
            }
         </div>
         <div className='w-32 text-lg'>
            { session?.role  === "USER" ? `Hello ${session?.name}` : "Hello Guest" }
         </div>
      </div>
   )
}

export default Header;