'use client'

import React from 'react';
import { SessionProvider } from "next-auth/react";

import { AuthProvider } from './authContext';

const index = ({ children }: { children: React.ReactNode }) => {
   return (
      <SessionProvider>
         <AuthProvider>
            {children}
         </AuthProvider>
      </SessionProvider>
   )
}

export default index;
