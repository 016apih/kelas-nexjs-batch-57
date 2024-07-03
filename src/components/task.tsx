'use client'

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { TTaskData } from '@/context/authContext';
import { fetchApi } from '@/utils/fetchApi';

import TaskItem from './taskItem';
import AddTask from './add-task';
import NoTask from './no-task';

export type TAction = "edit"|"switch"|"delete";

type TTaskComp = {
   task: any[];
}

const TaskComp = ({ task }: TTaskComp) => {
   const router = useRouter();
   const [selectedTask, setSelectedTask] = useState<TTaskData|null>(null);

   const doAction = async (act:TAction,d:TTaskData) => {
      if(act === 'edit'){
         setSelectedTask(d);
      } else if(act === "switch"){
         let {resp: { data=[] }, resp_status = "NOK"} = await fetchApi({
            path: `api/todos?id=${d.id}`,
            method: "PUT",
            body: { ...d, completed: !d.completed }
         });
      } else {
         let {resp: { data=[] }, resp_status = "NOK"} = await fetchApi({
            path: `api/todos?id=${d.id}`,
            method: "DELETE"
         });
      }
      act !== 'edit' && router.refresh();
   }

   const completedtask = useMemo(() => task.filter(d => d.completed),[task]);
   const ongoingtask = useMemo(() => task.filter(d => !d.completed),[task]);

   return (<>
      <AddTask task={selectedTask} setTask={setSelectedTask} />

      {task.length > 0 ? <>
         <div className="self-start w-full">
            <div className='text-base font-bold'>Ongoing Task</div>
            <div className='flex flex-col gap-y-2'>
               {ongoingtask && ongoingtask.map(d => (
                  <TaskItem 
                     { ...d} 
                     key={"ongoing-"+d.id} 
                     doAction={(act) => doAction(act, d)}
                  />
               ))}
            </div>
         </div>

         <div className="self-start w-full">
            <div className='text-base font-bold'>Completed Task</div>
            <div className='flex flex-col gap-y-2'>
               {completedtask && completedtask.map(d => (
                  <TaskItem 
                     { ...d}
                     key={"completed-"+d.id} 
                     doAction={(act) => doAction(act, d)}
                  />
               ))}
            </div>
         </div>
      </> : <NoTask /> }
      
   </>)
}

export default TaskComp;
