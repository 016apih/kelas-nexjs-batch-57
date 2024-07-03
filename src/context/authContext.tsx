import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type TUser = {
   id: number;
   email: string;
   name: string;
   role: string;
}

export type TTaskData = {
   id?: number;
   title?: string;
   completed?: boolean;
   userId?: number;
   createdAt?: string;
   updatedAt?: string
};

type TAuthContext = {
   user: TUser | null;
   task: TTaskData[]|[];
   loading: boolean;
   setTaskList: (data:TTaskData[]) => void;
}

export const isExpired = (expires: string): boolean => {
   const now = new Date();
   const expiryDate = new Date(expires);
   return now >= expiryDate;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
   const { data, status }:any = useSession();
   const loading = status === 'loading';

   const [user, setUser] = useState<TAuthContext['user']>(null);
   const [task, setTask] = useState<TAuthContext['task']>([]);

   useEffect(() => {
      if(data?.session){
         // console.log(data.session, data.session?.user)
         setUser(data.session.user as TAuthContext['user']);
      } else {
         setUser(null);
      }
   },[data]);

   const setTaskList = (data:TTaskData[]) => setTask(data);

   const valueProvider = useMemo(() => ({ user, loading, task, setTaskList }),[user, loading, task]);

   if(loading){
      return <p>Please wait .....</p>
   }

   return(
      <AuthContext.Provider value={valueProvider}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   const context = useContext(AuthContext);

   if(context === undefined){
      throw new Error('please use AuthProvider');
   }

   return context;
}
