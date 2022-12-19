import { useState, useEffect } from "react"
import { useToken } from "./useToken"
import { Buffer } from "buffer";
export interface tokenData{
    id:string,
    email:string,
}
export const useUser = () => {
    const [token] = useToken();
    const getPayloadFromToken = (token: string):tokenData => {
        const encodedPayload: string = token.split(".")[1];
        return JSON.parse(Buffer.from(encodedPayload,'base64').toString('ascii'));
    }

    const [user, setUser] = useState(() => {
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
