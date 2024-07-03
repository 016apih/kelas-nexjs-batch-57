import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/service';

import Header from '@/components/header';

const ProfilePage = async () => {
   const session = await getServerSession(authOptions) as any;

   return (<>
      <Header />
      <div className=''>
         <div className='flex flex-col justify-center items-center w-[580px] min-h-[calc(100vh_-_80px)] mx-auto gap-y-4'>
            <div className=' text-3xl'>
               email: {session?.email}<br/>
               fullname: {session?.name}
            </div>
         </div>
      </div>
   </>)
}

export default ProfilePage;