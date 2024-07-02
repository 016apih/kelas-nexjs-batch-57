import { createContext } from "react";
import Cookies from 'js-cookie';

import useQueries from '@/hooks/useQueries';
import { baseURL } from "@/hooks/useMutation";

export const UserContext = createContext({});

export const UserContextProvider = ({ children, ...props }) => {
   const { data: userData } = useQueries({
      prefixUrl: `${baseURL}/user/me`,
      header: { 'Authorization': `Bearer ${Cookies.get('user_token')}`}
   });
   
   return (
      <UserContext.Provider value={userData?.data || null} {...props}>
         {children}
      </UserContext.Provider>
   )
}