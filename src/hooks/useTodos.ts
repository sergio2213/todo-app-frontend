import { useCallback, useEffect, useState } from "react"
import { Todo } from "../pages/Todos"
import { useAuth } from "./useAuth"
import { useParams } from "react-router"
import { createTodo, deleteTodo, getOneList, getTodos, updateIsCompleted, updateTodo } from "../services/apiService"
import { List } from "../pages/TodoLists"

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState<Todo>({ title: '', description: '' })
    const [todoToDelete, setTodoToDelete] = useState<Todo>({ title: '', description: '' })
    const [todoToEdit, setTodoToEdit] = useState<Todo>({ title: '', description: '' })
    const [todoList, setTodoList] = useState<List | null>(null)
    
    const auth = useAuth()
    const { listId } = useParams<{ listId: string }>()
    

    const fetchTodos = useCallback(async () => {
        if (listId && auth?.token) {
            const todos = await getTodos(listId, auth.token)
            todos.sort((a, b) => (a.isCompleted === b.isCompleted) ? 0 : a.isCompleted ? -1 : 1)
            setTodos(todos)
        }
    }, [listId, auth])

    const fetchList = useCallback(async () => {
        if (listId && auth?.token) {
            const list = await getOneList(auth.token, listId)
            setTodoList(list)
        }
    }, [listId, auth])

    useEffect(() => {
        fetchList()
        fetchTodos()
    }, [fetchList, fetchTodos])

    const handleDeleteTodo = async () => {
        if (listId && auth?.token) {
            await deleteTodo(listId, todoToDelete.id as number, auth.token)
            fetchTodos()
        }
    }

    const handleEditTodo = async () => {
        if (listId && auth?.token) {
            await updateTodo(todoToEdit, auth.token)
            fetchTodos()
        }
    }

    const handleCreateTodo = async () => {
        if (listId && auth?.token) {
            await createTodo(listId, newTodo, auth.token)
            fetchTodos()
        }
    }

    const handleUpdateIsCompleted = async (todo: Todo) => {
        if (listId && auth?.token) {
            await updateIsCompleted(listId, todo, auth.token)
            fetchTodos()
        }
    }

    return {
        auth,
        todoList,
        setTodoList,
        todos,
        handleCreateTodo,
        handleDeleteTodo,
        newTodo,
        setNewTodo,
        todoToDelete,
        setTodoToDelete,
        todoToEdit,
        setTodoToEdit,
        handleUpdateIsCompleted,
        handleEditTodo
    }
}