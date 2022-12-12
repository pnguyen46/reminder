import { useState, useEffect } from "react"
import { useToken } from "./useToken"
export const useUser = () => {
    const [token] = useToken();
    const getPayloadFromToken = (token: string): object => {
        const encodedPayload: string = token.split(".")[1];
        return JSON.parse(window.atob(encodedPayload));
    }

    const [user, setUser] = useState((): object | null => {
        if (!token) {
            return null;
        }
        return getPayloadFromToken(token);
    })

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token))
        }
    }, [token])
    return (
        user
    );
}
