//Import interface
import {task} from "../App"

//Components
import Task from "./Task"

export interface Props{
    tasks:task[],
    onDelete:(id:number) => void,
    onToggle:(id:number) => void
}

const Tasks = ({tasks,onDelete,onToggle}:Props) => {
  return (
    <>
        {tasks.map((task:task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        ))}
    </>
  )
}

export default Tasks