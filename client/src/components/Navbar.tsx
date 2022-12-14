import { useNavigate } from "react-router-dom"
const Navbar = () => {
  const redirectTo = useNavigate();  
  const logout = () => {
    localStorage.removeItem("token");
    redirectTo("/login");
  }

  return (
    <nav className="border-b-2 border-black bg-white flex justify-end">
        <div>
            <button className="border-2 border-black rounded-md p-1 mr-3 my-2 bg-black text-white" onClick={logout}>Logout</button>
        </div>
    </nav>
  )
}

export default Navbar