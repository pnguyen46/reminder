import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactNode
}
const PrivateRoute = ({ children }: Props) => {
    const user = null;
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