import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/service';
import { fetchApi } from '@/utils/fetchApi';

import Header from '@/components/header';
import TaskComp from '@/components/task';

const TaskPage = async () => {
   const session = await getServerSession(authOptions) as any;
   const data = await fetchApi({
      path: `api/todos?userId=${session?.id}`,
      method: "GET",
   });

   return (<>
      <Header />
      <div>
         <div className='flex flex-col justify-center items-center w-[580px] min-h-[calc(100vh_-_80px)] mx-auto gap-y-4'>
            <div className='text-5xl'>
               Task Management
            </div>

            <TaskComp task={data?.resp?.data} />
         </div>
      </div>
   </>)
}

export default TaskPage;