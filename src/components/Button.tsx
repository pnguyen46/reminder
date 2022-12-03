export interface Props{
    text:string,
    color?:string,
    onAdd:() => void
}
const Button = ({onAdd,text,color = 'steelblue'}:Props) => {
  return (
    <button onClick={onAdd} style={{backgroundColor:color}} className="bg-black text-white border-none py-2 px-5 m-1 rounded cursor-pointer text-sm active:scale-95 focus:outline-none">{text}</button>
  )
}

export default Button