import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'));

export default function DetailNote({ note }) {

   return (
      <LayoutComponent metaTitle={"Detail Notes"}>
         <h2 className="p-2 m-2 font-bold">Detail Note</h2>
         <div className="border border-gray-500 mb-2 p-2 m-2">
            <p>title: {note?.title}</p>
            <p> desc: {note?.description}</p>
         </div>
      </LayoutComponent>
   );
}

export async function getStaticPaths(){
   const res = await fetch('https://service.pace-unv.cloud/api/notes');
   const notes = await res.json();

   const paths = notes?.data?.map(d => ({
      params: { id: d.id }
   }));

   return { paths, fallback: true }
}

export async function getStaticProps(context){
   const { id } = context.params;
   const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
   const note = await res.json();

   return { props: { note: note?.data }, revalidate: 10 }
}
