'use client'

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FormLogin = () => {
   const [isUser, setIsUser] = useState(true);
   const [isLoading, setLoading] = useState(false);
   const [formData, setFormData] = useState({email: '', password: ''});
      // // 'test1@gmail.com'
      // 'guest@gmail.com', password: 'password'});
   const [error, setError] = useState<undefined|string>();
	const router = useRouter();

   const onLogin = async () => {
      setLoading(true);
      let { email, password } = formData;
      if(!isUser){
         email = "guest@gmail.com";
         password = "password";
      }
      if(email === "" || password === ""){
         setError('User/Password not empty');
      } else {
         try {
            const res = await signIn('credentials', {
               redirect: false,
               email,
               password, 
               callbackUrl: '/task'
            });
   
            if(res?.error){
               console.log("sigin gagal");
               setError('User/Password is Wrong');
            } else {
               console.log("sigin");
               router.push('/task');
            }
            
         } catch (error) {
            console.log("sigin gagal");
         }
      }
      setLoading(false);
   }

   const onChangeTab = () => {
      setFormData({
         email: isUser ? "guest@gmail.com" : '',
         password: isUser ? "password" : '',
      });
      setError(undefined);
      setIsUser(s => !s);
   }

   return (<>
      <div className='flex justify-center items-center'>
         <button 
            className={`border border-black hover:bg-[#6FCBFF] active:bg-[#6FCBFF] px-5 py-1 rounded-s-[10px] border-r-0 ${isUser ? "bg-[#6FCBFF]" : ""}`}
            onClick={onChangeTab}
         >
            User
         </button>
         <button
            className={`border border-black hover:bg-[#6FCBFF] active:bg-[#6FCBFF] px-5 py-1 rounded-e-[10px] ${!isUser ? "bg-[#6FCBFF]" : ""}`}
            onClick={onChangeTab}
         >
            Guest
         </button>
      </div>

      {error && <small className='text-red-600'>{error}</small>}<br/>

      { isUser ? <>
         <div>
            <label htmlFor='email'>Email</label>
            <input className='border p-2 w-full border-black rounded-[10px]'
               type="email"
               id="email" 
               value={formData?.email} 
               onChange={e => setFormData(s => ({ ...s, email: e.target.value }) )} 
               required
            />
         </div>
         <div>
            <label htmlFor='password'>Password</label>
            <input className='border p-2 w-full border-black rounded-[10px]' 
               id='password' 
               type='password' 
               value={formData?.password} 
               onChange={e => setFormData(s => ({ ...s, password: e.target.value }) )} 
               required
            />
         </div>
      </> : <></> }

      <div className='flex justify-center items-center mt-10'>
         <button onClick={onLogin} className='border border-black bg-[#48AA52] text-white rounded-[10px] px-5 py-2'>
            {isLoading ? 'Please wait...' : 'Login'}
         </button>
      </div>
   </>)
}

export default FormLogin;
