import { URL_API } from "../config/api";
import { List } from "../pages/TodoLists";
import { Todo } from "../pages/Todos";
import { AuthResponse, RegisterResponse } from "../types/types";

export const login = async (email: string, password: string): Promise<AuthResponse | null> => {
    const response = await fetch(`${URL_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin'
    })
    if (response.ok) {
        return (await response.json()).data as AuthResponse
    } else {
        return null
    }
}

export const register = async (username: string, email: string, password: string): Promise<RegisterResponse | null> => {
    const response = await fetch(`${URL_API}/user/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'same-origin'
    })
    if (response.ok) {
        const data = await response.json()
        return data as RegisterResponse
    } else {
        return null
    }
}

export const getTodos = async (listId: string, token: string): Promise<Todo[]> => {
    const response = await fetch(`${URL_API}/lists/${listId}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin'
    })
    return (await response.json()).data.todos as Todo[]
}

export const createTodo = async (listId: string, newTodo: Todo, token: string): Promise<void> => {
    const { title, description } = newTodo
    const response = await fetch(`${URL_API}/lists/${listId}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin',
        body: JSON.stringify({ title, description })
    })
    const json = await response.json()
    console.log(json.message)
}

export const deleteTodo = async (listId: string, todoId: number, token: string): Promise<void> => {
    const response = await fetch(`${URL_API}/lists/${listId}/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin'
    })
    const json = await response.json()
    console.log(json.message)
}

export const updateIsCompleted = async (listId: string, todo: Todo, token: string): Promise<void> => {
    const body = {
        isCompleted: !todo.isCompleted
    }
    const response = await fetch(`${URL_API}/lists/${listId}/todos/${todo.id}/completed`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
        credentials: 'same-origin'
    })
    const json = await response.json()
    console.log(json.message)
}

export const getLists = async (token: string): Promise<List[]> => {
    const response = await fetch(`${URL_API}/lists`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin'
    })
    return (await response.json()).data.todoLists as List[]
}

export const getOneList = async (token: string, listId: string): Promise<List> => {
    const response = await fetch(`${URL_API}/lists/${listId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin'
    })
    const todoList = (await response.json()).data.todoList as List
    return todoList
}

export const createList = async (list: List, token: string) => {

    const { title, description } = list
    const response = await fetch(`${URL_API}/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin',
        body: JSON.stringify({ title, description })
    })
    const json = await response.json()
    console.log(json.message)

}

export const deleteList = async (listId: number, token: string): Promise<void> => {
    const response = await fetch(`${URL_API}/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin'
    })
    const json = await response.json()
    console.log(json.message)
}

export const updateTodo = async (todo: Todo, token: string): Promise<void> => {
    const { title, description } = todo
    const body = { title, description }
    const response = await fetch(`${URL_API}/lists/${todo.todoListId}/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
    })
    const json = await response.json()
    console.log(json.message)
}

export const updateList = async (list: List, token: string): Promise<void> => {
    const { title, description } = list
    const body = { title, description }
    const response = await fetch(`${URL_API}/lists/${list.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
    })
    const json = await response.json()
    console.log(json.message)
}
