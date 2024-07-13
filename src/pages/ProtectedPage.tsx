import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"

export const ProtectedPage = () => {
    const auth = useAuth()
    
    return auth?.isAuth ? <Outlet /> : <Navigate to='/' />
}