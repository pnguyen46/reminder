//icons
import {FaTimes} from "react-icons/fa"

//Import interface
import {task} from "../App"

export interface Props{
    task:task,
    onDelete:(id:number) => void,
    onCompleted:(id:number) => void
}

const Task = ({task,onDelete,onCompleted}:Props) => {
  return (
    <>
      <div className="flex">
        <button onClick={() => onCompleted(task.id)} className={`border-2 border-gray-400 w-4 h-4 m-auto ${task.completed? 'bg-red-500':''}`}></button>
        <div className="bg-slate-200 m-1 py-2 px-5 cursor-pointer flex-1">   
              <section>
                <h3 className="flex align-middle justify-between">
                    <span className={`${task.completed?'line-through text-slate-400':''}`}>{task.text}</span>
                    <FaTimes style={{color:"red",cursor:"pointer"}} onClick={() => onDelete(task.id)}/>
                </h3>
              </section>
        </div>
      </div>
    </>

  )
}

export default Task