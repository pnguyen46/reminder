//icons
import {FaTimes} from "react-icons/fa"

//Import interface
import {task} from "../App"

export interface Props{
    task:task,
    onDelete:(id:number) => void,
    onToggle:(id:number) => void
}

const Task = ({task,onDelete,onToggle}:Props) => {
  return (
    <div className={`bg-slate-200 m-1 py-2 px-5 cursor-pointer ${task.reminder ? 'border-l-4 border-green-600' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3 className="flex align-middle justify-between">
            {task.text}
            <FaTimes style={{color:"red",cursor:"pointer"}} onClick={() => onDelete(task.id)}/>
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task