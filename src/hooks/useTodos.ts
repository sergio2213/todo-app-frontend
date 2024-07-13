import { useCallback, useEffect, useState } from "react"
import { Todo } from "../pages/Todos"
import { useAuth } from "./useAuth"
import { useParams } from "react-router"
import { createTodo, deleteTodo, getOneList, getTodos, updateIsCompleted, updateTodo } from "../services/apiService"
import { List } from "../pages/TodoLists"

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [showNewTodoForm, setShowNewTodoForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [itemToDelete, setItemToDelete] = useState<Todo | null>(null)
    const [todoList, setTodoList] = useState<List | null>(null)
    const [itemToEdit, setItemToEdit] = useState<Todo | null>(null)
    
    
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

    const handleCreateTodo = async () => {
        if (listId && auth?.token) {
            await createTodo(listId, auth.token, title, description)
            fetchTodos()
            setTitle('')
            setDescription('')
            setShowNewTodoForm(false)
        }
    }

    const handleDeleteTodo = async (todo: Todo) => {
        if (listId && auth?.token) {
            await deleteTodo(listId, todo.id, auth.token)
            fetchTodos()
            setShowDeleteConfirm(false)
        }
    }

    const handleUpdateIsCompleted = async (todo: Todo) => {
        if (listId && auth?.token) {
            await updateIsCompleted(listId, todo.id, auth.token, todo.isCompleted)
            fetchTodos()
        }
    }

    const handleUpdateTodo = async (todo: Todo) => {
        if (listId && auth?.token) {
            await updateTodo(todo, auth.token)
            fetchTodos()
            setShowEditForm(false)
        }
    }

    return {
        auth,
        todoList,
        setTodoList,
        todos,
        title,
        setTitle,
        description,
        setDescription,
        showNewTodoForm,
        setShowNewTodoForm,
        showDeleteConfirm,
        showEditForm,
        setShowEditForm,
        setShowDeleteConfirm,
        handleCreateTodo,
        handleDeleteTodo,
        itemToDelete,
        setItemToDelete,
        itemToEdit,
        setItemToEdit,
        handleUpdateIsCompleted,
        handleUpdateTodo
    }
}