import React, { useCallback } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookies';
import { useRouter } from 'next/router';
import { Menu, MenuButton, MenuList, MenuItem, Button, Avatar, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useQueries from '@/hooks/useQueries';
import useMutation, { baseURL } from '@/hooks/useMutation';

const menus = [
   { path: '/', title: 'Home' },
   { path: '/users', title: 'Users' },
   { path: '/profile', title: 'Profile' },
   { path: '/notes', title: 'Notes' },
   { path: '/posts', title: 'Posts' },
]

const MenuHeader = () => {
   const { pathname, push } = useRouter();
   const { mutate } = useMutation();
   const toast = useToast();
   const auth = Cookies.getItem('user_token')
   const { data } = useQueries({ prefixUrl: `${baseURL}/user/me`, headers: {
      'Authorization': `Bearer ${auth}`
   } });
   
   const bgActive = useCallback((path) => {
      return path === pathname ? "bg-blue-300 font-bold" : ""
   }, [[pathname]]);

   const onLogout = async () => {
      const resp = await mutate({ 
         url: `${baseURL}/logout`, 
         method: 'GET', 
         headers: { 'Authorization': `Bearer ${auth}` }
      });
      if(!resp.success){
         toast({
            title: 'Logout Gagal',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top'
         });
      } else {
         Cookies.removeItem('user_token');
         push('/login');
      }
   }

   return (
      <div>
         {menus.map((d, id) => (
            <div key={"menus-" + id} className='inline-block'>
               <Link href={d.path} className={bgActive(d.path)}>
                  {d.title}
               </Link>
               {id < menus.length - 1 ? 
                  <> | &nbsp; </> 
               :  <> | &nbsp; 
                  <Menu className='mx-2'>
                     <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar name={data?.data?.name} src='' width={9} height={9} />
                     </MenuButton>
                     <MenuList>
                        <div className='px-2 py-3'>
                           {data?.data?.name}
                        </div>
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                        {/* <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem> */}
                     </MenuList>
                  </Menu>
               </> }
            </div>
         ))}
      </div>
   )
}

export default MenuHeader;