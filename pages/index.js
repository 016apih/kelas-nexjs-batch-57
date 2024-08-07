import { useEffect } from "react";

// import Layout from "@/layout";
// import Image from "next/image";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'));

export default function Main() {

   useEffect(() => {
      fetch('/api/hello')
         .then(res => res.json)
         .then(res => console.log('response => ', res))
         .catch(err => console.log('response => ', err))
   },[]);

   return (
      <LayoutComponent metaTitle={"Home"}>
         <p>Main</p>
         {/* <Image src="/next.png" width={400} height={400} alt="next img" />
         <img src="/next.png" style={{ width:400, height: 400 }} alt="next img" /> */}
      </LayoutComponent>
   );
}
