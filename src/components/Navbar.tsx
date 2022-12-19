import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";
const Navbar = () => {
  const redirectTo = useNavigate();
  const user = useUser();
  const logout = () => {
    localStorage.removeItem("token");
    redirectTo("/login");
  }

  return (
    <nav className="border-b-2 border-black bg-white flex justify-end">
        <div>
            <span className="mr-5">{user?.email}</span>
            <button className="border-2 border-black rounded-md p-1 mr-3 my-2 bg-black text-white" onClick={logout}>Logout</button>
        </div>
    </nav>
  )
}

export default Navbar