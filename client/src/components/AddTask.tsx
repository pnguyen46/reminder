import { ChangeEvent, FormEvent, useState } from "react"

export interface newTask{
  text:string,
}

export interface Props{
  makeTask:(text:string) => void
}

const AddTask = ({makeTask}:Props) => {
  const [text,setText] = useState<string>('');
  

  const submitTask = (event:FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    if(!text){
      alert("Please enter a task");
      return;
    }
    makeTask(text);
    setText('');
  }
  return (
    <form action="" className="mb-10" onSubmit={submitTask}>
        <div className="my-5 mx-0">
            <label htmlFor="task" className="block">Task</label>
            <input value={text} onChange={(event:ChangeEvent<HTMLInputElement>):void => setText(event.target.value)} type="text" placeholder="Add Task" id="task" className="w-full h-10 m-1 py-1 px-2 text-base border-2 border-gray-400" />
        </div>
        <button type="submit" id="saveTask" className="text-white border-none py-2 px-5 m-1 rounded cursor-pointer text-sm active:scale-95 focus:outline-none block w-full">Save Task</button>
    </form>
  )
}

export default AddTask