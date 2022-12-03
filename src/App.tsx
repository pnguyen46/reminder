import {useState} from "react"
import './App.css';

//components
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";

//interface
import { newTask } from "./components/AddTask";


export interface task{
  id:number,
  text:string,
  day:string,
  reminder:boolean
}

function App() {
  const [tasks,setTasks] = useState<task[]>(
    [
        {
            id:1,
            text:"Doctor Appointment",
            day:"Feb 5th at 2:30pm",
            reminder:true
        },
        {
            id:2,
            text:"Meeting at School",
            day:"Feb 6th at 1:30pm",
            reminder:true
        },
        {
            id:3,
            text:"Grocery Shopping",
            day:"Feb 5th at 2:30pm",
            reminder:false
        }
    ]
  )
  const [addTask,setAddTask] = useState<boolean>(false);
  
  //handlers
  const createTask = (inputTask:newTask):void => {
    const id:number = Math.floor(Math.random() * 10000) + 1;
    const newTask:task = {id,...inputTask};
    setTasks([...tasks,newTask])
  }


  const deleteTask = (id:number):void => {
    setTasks(tasks.filter((task:task) => task.id !== id))
  }

  const toggleReminder = (id:number):void => {
    setTasks(tasks.map((task:task) => {
      if(task.id === id){
        return {...task,reminder:!task.reminder};
      }else{
        return task;
      }
    }));
  }

  return (
    <div className="max-w-lg my-8 mx-auto overflow-auto min-h-300 border border-blue-800 p-8 rounded-md">
      <Header title='Todo List' addTask={addTask} onAdd={():void=> setAddTask(!addTask)}/>
      {addTask && (<AddTask makeTask={createTask}/>)}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:'Add Tasks'}
    </div>
  );
}

export default App;
