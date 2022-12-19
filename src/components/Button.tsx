export interface Props {
  text: string,
  color?: string,
  onAdd?: () => void
}
const Button = ({ onAdd, text, color = 'steelblue' }: Props) => {
  return (
    <button onClick={onAdd} style={{ backgroundColor: color }} className="btn">{text}</button>
  )
}

export default Button