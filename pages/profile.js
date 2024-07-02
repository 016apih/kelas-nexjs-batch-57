import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import Layout from '@/layout';

const Profile = () => {
   const { data, error, isLoading } = useSWR('/api/user/1', fetcher);

   if(error) return <div>Failed to Load</div>
   if(isLoading) return <div>Loading ...</div>

   return (
      <Layout 
         metaTitle={"Profile"} 
         metaDescription={"Semua informasi ini adalah seputar profile user"}
      >
         <p>Profile <b>{`${data.firstName} ${data.lastName}`}</b></p>
      </Layout>
   )
}

export default Profile;