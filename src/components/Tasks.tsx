//Import interface
import {task} from "../pages/Home"

//Components
import Task from "./Task"

export interface Props{
    tasks:task[],
    onDelete:(id:string) => void,
    onCompleted:(id:string) => void,
    onEdit:(id:string,text:string) => void
}

const Tasks = ({tasks,onDelete,onCompleted,onEdit}:Props) => {
  return (
    <>
        {tasks.map((task:task) => (
          <Task key={task._id} task={task} onCompleted={onCompleted} onDelete={onDelete} onEdit={onEdit}/>
        ))}
    </>
  )
}

export default Tasks