//Import interface
import {task} from "../pages/Home"

//Components
import Task from "./Task"

export interface Props{
    tasks:task[],
    onDelete:(id:number) => void,
    onCompleted:(id:number) => void,
    onEdit:(id:number,text:string) => void
}

const Tasks = ({tasks,onDelete,onCompleted,onEdit}:Props) => {
  return (
    <>
        {tasks.map((task:task) => (
          <Task key={task.id} task={task} onCompleted={onCompleted} onDelete={onDelete} onEdit={onEdit}/>
        ))}
    </>
  )
}

export default Tasks