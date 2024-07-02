import React, { useState } from 'react'
import { Button, Flex, FormControl, Heading, Input, Stack, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookies';

import useMutation, { baseURL } from '@/hooks/useMutation';
import { useRouter } from 'next/router';

const Login = () => {
   const { mutate } = useMutation();
   const toast = useToast();
   const router = useRouter();
   const [payload, setPayload] = useState({ email: 'rehan@mail.com', password: '12345' });

   const onSubmit = async () => {
      const resp = await mutate({ url: `${baseURL}/login`, payload });
      if(!resp?.success){
         toast({
            title: 'Login Gagal',
            description: "Email/password tidak sesuai",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top'
         });
      } else {
         Cookies.setItem('user_token', resp?.data?.token, {
            expires: new Date(resp?.data?.expires_at),
            path: '/'
         });
         router.push('/');
      }
   }

   return (
      <Flex alignItems='center' justifyContent='center'>
         <Stack direction='column'>
            <Heading as='h4'>LOGIN</Heading>
            <FormControl>
               <Input placeholder='email' value={payload.email} onChange={(e) => setPayload(s => ({ ...s, email: e.target.value}))}/>
            </FormControl>
            <FormControl>
               <Input placeholder='password' type='password' value={payload.password} onChange={(e) => setPayload(s => ({ ...s, password: e.target.value}))}/>
            </FormControl>
            <FormControl>
               <Button onClick={onSubmit}>Submit</Button>
            </FormControl>
         </Stack>
      </Flex>
   )
}

export default Login;