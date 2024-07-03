import FormLogin from '@/components/form-login';

export default function Home() {
   return (
      <div className='flex justify-center items-center m-auto min-h-screen text-black text-base'>
         <div className='border w-96 h-96 rounded-md border-black p-10'>
            <FormLogin />
         </div>
      </div>
   )
}

