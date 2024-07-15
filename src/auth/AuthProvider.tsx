import { createContext, useEffect, useState } from "react"
import { User } from "../types/types"
import { login } from "../services/apiService"

export interface AuthContextData {
    loginAction: (email: string, password: string) => void
    logoutAction: () => void
    token: string | null
    user: User | null
    isAuth: boolean
}

export const AuthContext = createContext<null | AuthContextData>(null)

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const isAuth = user !== null && token !== null

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userInfo = localStorage.getItem('user')
        if (token && userInfo) {
            const user = JSON.parse(userInfo)
            setUser(user)
            setToken(token)
        }
    }, [])

    const loginAction = async (email: string, password: string) => {
        try {
            const data = await login(email, password)
            if (data !== null) {
                setUser(data.user)
                setToken(data.token)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }


    const logoutAction = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ loginAction, logoutAction, token, user, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}