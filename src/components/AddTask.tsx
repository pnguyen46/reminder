import { ChangeEvent, FormEvent, useState } from "react"

export interface newTask{
  text:string,
  day:string,
  reminder:boolean
}

export interface Props{
  makeTask:({text,day,reminder}:newTask) => void
}

const AddTask = ({makeTask}:Props) => {
  const [text,setText] = useState<string>('');
  const [day,setDay] = useState<string>('');
  const [reminder,setReminder] = useState<boolean>(false); 
  

  const submitTask = (event:FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    if(!text){
      alert("Please enter a task");
      return;
    }
    makeTask({text,day,reminder});
    setText('');
    setDay('');
    setReminder(false);
  }
  return (
    <form action="" className="mb-10" onSubmit={submitTask}>
        <div className="my-5 mx-0">
            <label htmlFor="task" className="block">Task</label>
            <input value={text} onChange={(event:ChangeEvent<HTMLInputElement>):void => setText(event.target.value)} type="text" placeholder="Add Task" id="task" className="w-full h-10 m-1 py-1 px-2 text-base border-2 border-gray-400" />
        </div>
        <div className="mb-10">
            <label htmlFor="time">Day & Time</label>
            <input value={day} onChange={(event:ChangeEvent<HTMLInputElement>):void => setDay(event.target.value)} type="text" placeholder="Add Day & Time" id="time" className="w-full h-10 m-1 py-1 px-2 text-base border-2 border-gray-400" />
        </div>
        <div className="mb-10 flex align-middle justify-between">
            <label htmlFor="reminder" className="flex-1">Set Reminder</label>
            <input checked={reminder} onChange={(event) => setReminder(event.currentTarget.checked)} type="checkbox" id="reminder" className="w-full h-5 m-1 py-1 px-2 text-base border-2 border-gray-400 flex-1" />
        </div>
        <input type="submit" value='Save Task' className="bg-black text-white border-none py-2 px-5 m-1 rounded cursor-pointer text-sm active:scale-95 focus:outline-none block w-full"/>
    </form>
  )
}

export default AddTask