import React from 'react'
import moment from 'moment';
import { Pencil, Circle, CircleX, CircleCheck } from 'lucide-react';

import { TAction } from './task';
import { TTaskData } from '@/context/authContext';

type TTaskItem = TTaskData & {
   doAction: (act:TAction) => void;
}

const TaskItem = ({ title, completed, createdAt, doAction }: TTaskItem) => {
   return (
      <div className='flex justify-between items-center bg-[#D0D0D0] p-3 pb-2 w-full rounded-[10px]'>
         <div>
            <div className='flex justify-start gap-x-1 text-base'>
               {title}
               <button onClick={() => doAction('edit')}>
                  <Pencil size={18} />
               </button>
            </div>
            <div className='text-xs'>
               {moment(createdAt?.replace(/[TZ]/g, " ")).format("DD MMM YYYY HH:mm")}
            </div>
         </div>
         <div className="flex justify-center gap-x-1">
            <button onClick={() => doAction('delete')}>
               <CircleX />
            </button>
            <button onClick={() => doAction('switch')}>
               {completed ? 
                  <CircleCheck /> 
               : 
                  <Circle color='black' fill='white' />
               }
            </button>
         </div>
      </div>
   )
}

export default TaskItem
