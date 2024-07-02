import { useCallback, useEffect, useState } from 'react';

const useQueries = ({ prefixUrl = "", headers={} }) => {

   const [data, setData] = useState({
      data: null,
      isLoading: true,
      isError: false
   });

   const fetchingData = useCallback( async ({ url='', method='GET', headers }) => {
      try {
         const resp = await fetch(url, { method, headers });
         const res = await resp.json();
         setData({ ...data, data: res, isLoading: false });
      } catch (error) {
         setData({ ...data, isError: true, isLoading: false });
      }
   },[]);
   
   useEffect(() => {
      if(prefixUrl){
         fetchingData({ url: prefixUrl, headers });
      }
   },[]);
   
   return { ...data }
};

export default useQueries;
