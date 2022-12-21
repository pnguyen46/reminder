import { useState, useEffect } from "react"
import axios from "axios";
import { useUser } from "../auth/useUser";


//components
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import AddTask from "../components/AddTask";
import Navbar from "../components/Navbar";

//interface
import { newTask } from "../components/AddTask";
export interface task {
  _id: string,
  text: string,
  completed: boolean
}

const Home = () => {
  const user = useUser();
  const [tasks, setTasks] = useState<task[]>([]);
  const [addTask, setAddTask] = useState<boolean>(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  // handlers
  const fetchTasks = async () => {
    const response = await axios.get(`https://reminder-api-syhx.onrender.com/api/todos/${user?.id}`);
    const data = response.data;
    return data;
  }

  const createTask = async (inputTask: string) => {
    const response = await axios.post('https://reminder-api-syhx.onrender.com/api/todo', {
      user: user?.id,
      text: inputTask
    });
    const { text, completed, _id }: task = response.data;
    setTasks([...tasks, { text, completed, _id }])
  }


  const deleteTask = async (id: string) => {
    await axios.delete(`https://reminder-api-syhx.onrender.com/api/todos/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  }

  const editTask = async (id: string, text: string) => {
    const response = await axios.put('https://reminder-api-syhx.onrender.com/api/updateTodo', {
      id,
      text
    });
    const { text: newText } = response.data;
    setTasks(tasks.map((task) => {
      if (task._id === id) {
        return { ...task, text: newText }
      } else {
        return task;
      }
    }));
  }


  const toggleComplete = async (id: string) => {
    const task = tasks.find(task => task._id === id);
    const response = await axios.put('https://reminder-api-syhx.onrender.com/api/completed', {
      id,
      complete: !task?.completed
    });
    const { completed } = response.data;
    setTasks(tasks.map((task: task) => {
      if (task._id === id) {
        return { ...task, completed }
      } else {
        return task;
      }
    }))
  }
  return (
    <>
      <Navbar/>
      <div className="max-w-lg my-8 mx-auto overflow-auto min-h-300 border border-blue-800 p-8 rounded-md bg-white">
        <Header title='Todo:' addTask={addTask} onAdd={(): void => setAddTask(!addTask)} />
        {addTask && (<AddTask makeTask={createTask} />)}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onCompleted={toggleComplete} onEdit={editTask} /> : 'Add Tasks'}
      </div>
    </>
  )
}

export default Home