import { useCallback, useEffect, useState } from "react"
import { List } from "../pages/TodoLists"
import { useAuth } from "./useAuth"
import { createList, deleteList, getLists, updateList } from "../services/apiService"

export const useLists = () => {
    const [lists, setLists] = useState<List[]>([])
    const [newList, setNewList] = useState<List>({ title: '', description: '' })
    const [listToDelete, setListToDelete] = useState<List>({ title: '', description: '' })
    const [listToEdit, setListToEdit] = useState<List>({ title: '', description: '' })

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

    const handleDeleteList = async () => {
        if (auth?.token) {
            await deleteList(listToDelete.id as number, auth.token)
            fetchLists()
        }
    }

    const handleEditList = async () => {
        if (auth?.token) {
            await updateList(listToEdit, auth.token)
            fetchLists()
        }
    }

    const handleCreateList = async () => {
        if (auth?.token) {
            await createList(newList, auth.token)
            fetchLists()
        }
    }

    return {
        user,
        lists,
        listToDelete,
        setListToDelete,
        listToEdit,
        setListToEdit,
        newList,
        setNewList,
        handleCreateList,
        handleDeleteList,
        handleEditList
    }
}