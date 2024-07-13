import { useState } from "react"
import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { Navigate, useNavigate } from 'react-router-dom'
import { PublicLayout } from "../layout/PublicLayout"
import { useAuth } from "../hooks/useAuth"

export const Login: React.FC = () => {
    const [email, setEmail] = useState('sergio@sergio.dev')
    const [password, setPassword] = useState('sergio')
    
    const navigate = useNavigate()
    const auth = useAuth()

    if (auth?.isAuth) {
        return (
            <Navigate to='/lists' />
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email !== '' && password !== '') {
            auth?.loginAction(email, password)
            navigate('/lists')
        }
        setEmail('')
        setPassword('')
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <PublicLayout>
            <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px'}}>
            <Paper elevation={3} component='form' onSubmit={handleSubmit} sx={{height: '350px', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', justifyContent: 'center'}}>
                <Typography variant='body1' display='block' sx={{fontSize: '2rem', fontWeight: 'bold'}}>Log in</Typography>
                <TextField variant='outlined' type='email' label='Email' value={email} required onChange={handleEmailChange} />
                <TextField variant='outlined' type='password' label='Password' value={password} required onChange={handlePasswordChange} />
                <Button type='submit' variant='contained' size='large'>Sign in</Button>
            </Paper>
        </Container>
        </PublicLayout>
        
    )
}