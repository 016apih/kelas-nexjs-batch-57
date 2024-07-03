import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

import { TTaskData } from '@/context/authContext';
import { fetchApi } from '@/utils/fetchApi';

type TAddTask = {
   task: TTaskData|null;
   setTask: (d:TTaskData|null) => void;
}

const AddTask = ({ task, setTask }: TAddTask ) => {
   const router = useRouter();
   const session:any = useSession();

   const doAction = async () => {
      let { id, title, completed } = task ?? {};
      let path = 'api/todos', method = 'POST';
      if(id){
         path = `api/todos?id=${id}`;
         method = 'PUT'
      }
      let {resp: { data=[] }, resp_status = "NOK"} = await fetchApi({
         path,  method,
         body: { title, completed: completed || false, userId: session?.data?.id }
      });
      setTask(null);
      router.refresh();
   }

   return (<>
      <div className='items-start self-start w-full'>
         <label htmlFor='title' className='w-full'>Title</label><br/>
         <input type='text' name='title' className='border border-black rounded-[10px] w-full h-12 p-5' 
            value={task?.title ?? ""}
            onChange={e => setTask(({ ...(task || {}), title: e.target.value}) ) }
            onFocus={e => e.target.select()}
         />
      </div>
      
      <div className='flex justify-center items-center gap-x-2'>
         <button 
            className={`py-3 px-5 rounded-[10px] ${task?.id ? 'bg-[#FFB46F]' : 'bg-[#6FCBFF]' }`} 
            onClick={doAction}
         >
         { task?.id ? "Update Task" : "Add Task" }
         </button>
         {task?.title && 
            <button className='bg-[#FF6F6F] py-3 px-5 rounded-[10px]' onClick={() => setTask(null)}>
               Cancel
            </button>
         }
      </div>
   </>)
}

export default AddTask;
