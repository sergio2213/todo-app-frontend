import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login.tsx'
import { Register } from './pages/Register.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { ProtectedPage } from './pages/ProtectedPage.tsx'
import { TodoLists } from './pages/TodoLists.tsx'
import { Todos } from './pages/Todos.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <ProtectedPage />,
    children: [
      {
        path: '/lists',
        element: <TodoLists />
      },
      {
        path: '/lists/:listId/todos',
        element: <Todos />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
