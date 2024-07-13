import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { PublicLayout } from "../layout/PublicLayout"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { URL_API } from "../config/api"

export const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const auth = useAuth()

    if (auth?.isAuth) {
        return <Navigate to='/lists' />
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch(`${URL_API}/user/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }),
            credentials: 'same-origin'
        })
        const data = await response.json()
        if (data.ok) {
            navigate('/')
        }
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <PublicLayout>
            <>
                <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}>
                    <Paper elevation={3} component='form' onSubmit={handleSubmit} sx={{ height: '350px', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', justifyContent: 'center' }}>
                        <Typography variant='body1' display='block' sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Registration</Typography>
                        <TextField variant='outlined' label='Username' value={username} onChange={handleUsernameChange} required />
                        <TextField variant='outlined' label='Email' value={email} onChange={handleEmailChange} required />
                        <TextField variant='outlined' type='password' value={password} onChange={handlePasswordChange} label='Password' required />
                        <Button type='submit' variant='contained' size='large'>Sign up</Button>
                    </Paper>
                </Container>
            </>
        </PublicLayout>
    )
}