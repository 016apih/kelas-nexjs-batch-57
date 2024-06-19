import Layout from '@/layout'
import { useRouter } from 'next/router'
import React from 'react'

const UserByName = () => {
   const router = useRouter();
   const { id } = router?.query;
   
   return (
      <Layout metaDescription="user by name">
         <div>UserByName {id}</div>
      </Layout>
   )
}

export default UserByName