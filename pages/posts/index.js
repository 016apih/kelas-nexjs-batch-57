import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import('@/layout'));

export default function Posts({ posts }) {

   return (
      <LayoutComponent metaTitle={"Posts"}>
         {posts?.map((d, id) => (
            <Link href={`/Posts/${d.id}`} key={"Posts-"+id}>
               <div className="border border-gray-500 mb-2 p-2 m-2">
                  <p>{d.id}</p>
                  <p>{d.title}</p>
                  <p>{d.body}</p>
               </div>
            </Link>
         ))}
      </LayoutComponent>
   );
}

export async function getServerSideProps(){
   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
   const posts = await res.json();

   return { props: { posts } }
}
