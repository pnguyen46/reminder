//components
import Button from "./Button"
//interface
export interface Props{
  title?:string,
  onAdd:() => void,
  addTask:boolean
}

const Header = ({onAdd,addTask,title = 'Todo List'}:Props) => {
  return (
    <header className="flex justify-between align-middle mb-5">
      <h1 className="text-4xl font-bold">{title}</h1>
      <Button onAdd={onAdd} text={addTask ?'Close':'Add'} color={addTask ?'red':'green'}/>
    </header>
  )
}

export default Header