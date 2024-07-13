import { useCallback, useEffect, useState } from "react"
import { List } from "../pages/TodoLists"
import { useAuth } from "./useAuth"
import { createList, deleteList, getLists, updateList } from "../services/apiService"

export const useLists = () => {
    const [lists, setLists] = useState<List[]>([])
    const [showNewListForm, setShowNewListForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [listToDelete, setListToDelete] = useState<List | null>(null)
    const [listToEdit, setListToEdit] = useState<List | null> (null)

    const auth = useAuth()
    const user = auth?.user

    const fetchLists = useCallback(async () => {
        if (auth?.token) {
            const lists = await getLists(auth.token)
            setLists(lists)
        }
    }, [auth])

    useEffect(() => {
        fetchLists()
    }, [fetchLists])

    const handleCreateList = async () => {
        if (auth?.token) {
            await createList(auth.token, title, description)
            fetchLists()
            setTitle('')
            setDescription('')
            setShowNewListForm(false)
        }
    }

    const handleDeleteList = async (list: List) => {
        if (auth?.token) {
            await deleteList(list.id, auth.token)
            fetchLists()
            setTitle('')
            setDescription('')
            setShowDeleteConfirm(false)
        }
    }

    const handleEditList = async (list: List) => {
        if (auth?.token) {
            await updateList(list, auth.token)
            fetchLists()
        }
    }

    return {
        user,
        lists,
        showNewListForm,
        setShowNewListForm,
        showDeleteConfirm,
        setShowDeleteConfirm,
        showEditForm,
        setShowEditForm,
        title,
        setTitle,
        description,
        setDescription,
        listToDelete,
        setListToDelete,
        listToEdit,
        setListToEdit,
        handleCreateList,
        handleDeleteList,
        handleEditList
    }
}