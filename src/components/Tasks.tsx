//Import interface
import {task} from "../App"

//Components
import Task from "./Task"

export interface Props{
    tasks:task[],
    onDelete:(id:number) => void,
    onCompleted:(id:number) => void
}

const Tasks = ({tasks,onDelete,onCompleted}:Props) => {
  return (
    <>
        {tasks.map((task:task) => (
          <Task key={task.id} task={task} onCompleted={onCompleted} onDelete={onDelete}/>
        ))}
    </>
  )
}

export default Tasks