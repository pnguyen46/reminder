import { useState } from "react"
//icons
import { FaTimes, FaPencilAlt, FaTrash, FaCheck } from "react-icons/fa"

//Import interface
import { task } from "../pages/Home"

//Interface
export interface Props {
  task: task,
  onDelete: (id: string) => void,
  onCompleted: (id: string) => void,
  onEdit: (id: string, text: string) => void
}

const Task = ({ task, onDelete, onCompleted, onEdit }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<string>(task.text);
  const [error, setError] = useState("");
  const submitNewTask = (id: string, text: string) => {
    if(!text){
      setError("Task cannot be empty");
      setTimeout(() => setError(""), 3000);
    }else{
      onEdit(id, text);
      setEdit(!edit);
    }
  }
  return (
    <>
      {error && <div className="fail">{error}</div>}
      <div className="flex">
        {edit ? "" : <button onClick={() => onCompleted(task._id)} className={`border-2 border-gray-400 w-4 h-4 m-auto ${task.completed ? 'bg-red-500' : ''}`}></button>}
        <div className="bg-slate-200 m-1 py-2 px-5 cursor-pointer flex-1">
          <section>
            <h3 className="flex align-middle justify-between">
              {edit ? <input value={taskInput} onChange={(event) => setTaskInput(event.target.value)} className="w-80 p-1" /> : <span className={`${task.completed ? 'line-through text-slate-400' : ''}`}>{task.text}</span>}
              <span className="flex gap-3">
                {edit ? <><FaCheck onClick={() => submitNewTask(task._id, taskInput)} className="text-green-500" /> <FaTimes className="text-red-600" onClick={() => { setEdit(!edit); setTaskInput(task.text) }} /></> : <><FaPencilAlt onClick={() => setEdit(!edit)} /> <FaTrash className="cursor-pointer" onClick={() => onDelete(task._id)} /></>}
              </span>
            </h3>
          </section>
        </div>
      </div>
    </>
  )
}

export default Task