import {useState,useEffect} from "react"
import axios from "axios";
import { useUser } from "../auth/useUser";


//components
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTask from "../components/AddTask";

//interface
import { newTask } from "../components/AddTask";
export interface task{
  _id:string,
  text:string,
  completed:boolean
}

const Home = () => {
    const user = useUser();
    const [tasks,setTasks] = useState<task[]>([]);
      const [addTask,setAddTask] = useState<boolean>(false);
      
      useEffect(() => {
        const getTasks = async () => {
          const tasksFromServer = await fetchTasks();
          setTasks(tasksFromServer);
        }
        getTasks();
      },[])
      
      // handlers
      const fetchTasks = async() => {
        const response = await axios.get(`/api/todos/${user?.id}`);
        const data = response.data;
        return data;
      }

      const createTask = async (inputTask:string) => {
        const response = await axios.post('/api/todo',{
          user:user?.id,
          text:inputTask
        });
        const {text,completed,_id}:task = response.data;
        setTasks([...tasks,{text,completed,_id}])
      }
    
    
      const deleteTask = async (id:string) => {
        await axios.delete(`/api/todos/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
      }
    
      const editTask = (id:string,text:string):void => {
        // setTasks(tasks.map((task) => {
        //   if(task.id === id){
        //     return {...task,text}
        //   }else{
        //     return task;
        //   }
        // }));
      }
    
    
      const toggleComplete = async (id:string) => {
        const task = tasks.find(task => task._id === id);
        const response = await axios.put('/api/completed',{
          id,
          complete:!task?.completed
        });
        const {completed} = response.data;
        setTasks(tasks.map((task:task) => {
          if(task._id === id){
            return {...task,completed}
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