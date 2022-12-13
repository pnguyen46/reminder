import {useState} from "react"
import axios from "axios";
import { useUser } from "../auth/useUser";


//components
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTask from "../components/AddTask";

//interface
import { newTask } from "../components/AddTask";
export interface task{
  id:number,
  text:string,
  completed:boolean
}

const Home = () => {
    const user = useUser();
    const [tasks,setTasks] = useState(
        [
            {
                id:1,
                text:"Doctor Appointment",
                completed:false
            },
            {
                id:2,
                text:"Meeting at School",
                completed:false
            },
            {
                id:3,
                text:"Grocery Shopping",
                completed:false
            }
        ]
      )
      const [addTask,setAddTask] = useState<boolean>(false);

      
      // handlers
      const createTask = async (inputTask:string) => {
        const response = await axios.post('/api/todo',{
          user:user?.id,
          text:inputTask
        });
        const {text,completed,_id:id} = response.data;
        setTasks([...tasks,{text,completed,id}])
      }
    
    
      const deleteTask = (id:number):void => {
        setTasks(tasks.filter((task:task) => task.id !== id))
      }
    
      const editTask = (id:number,text:string):void => {
        setTasks(tasks.map((task) => {
          if(task.id === id){
            return {...task,text}
          }else{
            return task;
          }
        }));
      }
    
    
      const toggleComplete = (id:number):void => {
        setTasks(tasks.map((task:task) => {
          if(task.id === id){
            return {...task,completed:!task.completed}
          }else{
            return task;
          }
        }))
      }
  return (
    <div className="max-w-lg my-8 mx-auto overflow-auto min-h-300 border border-blue-800 p-8 rounded-md">
      <Header title='Todo List' addTask={addTask} onAdd={():void=> setAddTask(!addTask)}/>
      {addTask && (<AddTask makeTask={createTask}/>)}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onCompleted={toggleComplete} onEdit={editTask}/>:'Add Tasks'}
    </div>
  )
}

export default Home