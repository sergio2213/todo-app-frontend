import { PrivateLayout } from "../layout/PrivateLayout"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ListCard } from "../components/ListCard"
import { useLists } from "../hooks/useLists"
import { EmptyState } from "../components/EmptyState"
import { useState } from "react"

export interface List {
    id?: number
    title: string
    description: string
    userId?: number
}

export const TodoLists = () => {

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showNewListForm, setShowNewListForm] = useState(false)

    const {
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
    } = useLists()

    // ----------------------------------- DELETE LIST

    const handleOpenDeleteConfirm = (list: List) => {
        setListToDelete(list)
        setShowDeleteConfirm(true)
    }

    const handleCloseDeleteConfirm = () => {
        setShowDeleteConfirm(false)
        setListToDelete({ title: '', description: '' })
    }

    const handleDeleteAction = () => {
        handleDeleteList()
        setShowDeleteConfirm(false)
        setListToDelete({ title: '', description: '' })
    }

    // ------------------------- EDIT LIST

    const handleOpenEditForm = (list: List) => {
        setListToEdit(list)
        setShowEditForm(true)
    }

    const handleCloseEditForm = () => {
        setShowEditForm(false)
        setListToEdit({ title: '', description: '' })
    }

    const handleListToEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setListToEdit({ ...listToEdit, [name]: value } as List)
    }

    const handleListEditAction = (e: React.FormEvent) => {
        e.preventDefault()
        handleEditList()
        setShowEditForm(false)
        setListToEdit({ title: '', description: '' })
    }

    // ------------------------- CREATE LIST

    const handleOpenNewListForm = () => {
        setShowNewListForm(true)
    }

    const handleCloseNewListForm = () => {
        setShowNewListForm(false)
        setNewList({ title: '', description: '' })
    }

    const handleNewListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewList({ ...newList, [name]: value } as List)
    }

    const handleCreateListAction = (e: React.FormEvent) => {
        e.preventDefault()
        handleCreateList()
        setShowNewListForm(false)
        setNewList({ title: '', description: '' })
    }

    return (
        <PrivateLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 25, py: '10px', fontWeight: 'bold' }} variant='overline'>{user?.username}'s Todo Lists</Typography>
                <Box sx={{ px: '20px', py: '20px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                    {lists.length === 0 ? <EmptyState message="You do not have any lists, create one to start!" /> : lists.map(list => {
                        return (
                            <ListCard onEdit={handleOpenEditForm} key={list.id} list={list} onDelete={handleOpenDeleteConfirm} />
                        )
                    })}
                </Box>
                {/* BOTONERA */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 5 }}>
                    <Button onClick={handleOpenNewListForm} variant='contained'>Create New List</Button>
                </Box>
                {/* FORMULARIO NUEVA LISTA */}
                <Dialog open={showNewListForm} onClose={handleCloseNewListForm}>
                    <DialogTitle>New List</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='newListForm' onSubmit={handleCreateListAction} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' name='title' value={newList.title} onChange={handleNewListChange} variant='standard' required />
                            <TextField label='Description' name='description' value={newList.description} onChange={handleNewListChange} variant='standard' />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewListForm} variant='contained'>Cancel</Button>
                        <Button type='submit' form='newListForm' variant='contained'>Create</Button>
                    </DialogActions>
                </Dialog>
                {/* CONFIRMACIÓN ELIMINAR LISTA */}
                <Dialog
                    open={showDeleteConfirm}
                    onClose={handleCloseDeleteConfirm}
                >
                    <DialogTitle>
                        Warning
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Delete '{listToDelete?.title}'?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
                        <Button onClick={handleDeleteAction}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* FORMULARIO EDICIÓN LISTA */}
                <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                    <DialogTitle>Edit List</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='editForm' onSubmit={handleListEditAction} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' name='title' value={listToEdit?.title} onChange={handleListToEditChange} variant='standard' required />
                            <TextField label='Description' name='description' value={listToEdit?.description} onChange={handleListToEditChange} variant='standard' />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditForm} variant='contained'>Cancel</Button>
                        <Button type='submit' form='editForm' variant='contained'>Update</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </PrivateLayout>
    )
}