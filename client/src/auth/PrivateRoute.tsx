import { Navigate } from "react-router-dom";
import { useUser } from "./useUser";

interface Props {
    children: React.ReactNode
}
const PrivateRoute = ({ children }: Props) => {
    const user: object | null = useUser();
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <>
            {children}
        </>
    );
}

export default PrivateRoute