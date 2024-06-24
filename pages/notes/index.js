import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import('@/layout'));

export default function Notes({ notes }) {

   return (
      <LayoutComponent metaTitle={"Notes"}>
         {notes?.data?.map((d, id) => (
            <Link href={`/notes/${d.id}`} key={"notes-"+id}>
               <div className="border border-gray-500 mb-2 p-2 m-2">
                  <p>{d.title}</p>
                  <p>{d.description}</p>
               </div>
            </Link>
         ))}
      </LayoutComponent>
   );
}

export async function getStaticProps(){
   const res = await fetch('https://service.pace-unv.cloud/api/notes');
   const notes = await res.json();

   return { props: { notes }, revalidate: 10 }
}
