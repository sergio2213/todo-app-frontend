import { PrivateLayout } from "../layout/PrivateLayout"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ListCard } from "../components/ListCard"
import { useLists } from "../hooks/useLists"
import { EmptyState } from "../components/EmptyState"

export interface List {
    id: number
    title: string
    description: string
    userId: number
}

export const TodoLists = () => {

    const {
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
    } = useLists()

    const handleOpenNewListForm = () => {
        setShowNewListForm(true)
    }

    const handleCloseNewListForm = () => {
        setTitle('')
        setDescription('')
        setShowNewListForm(false)
    }

    const handleSubmitNewList = (e: React.FormEvent) => {
        e.preventDefault()
        handleCreateList()
        setTitle('')
        setDescription('')
        setShowNewListForm(false)
    }

    const handleCloseDeleteConfirm = () => {
        setShowDeleteConfirm(false)
    }

    const handleOpenDeleteConfirm = (list: List) => {
        setShowDeleteConfirm(true)
        setListToDelete(list)
    }

    const handleDelete = (list: List) => {
        handleDeleteList(list)
        setShowDeleteConfirm(false)
    }

    const handleOpenEditForm = (list: List) => {
        setListToEdit(list)
        setShowEditForm(true)
    }

    const handleCloseEditForm = () => {
        setShowEditForm(false)
        setListToEdit(null)
    }

    const handleListToEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setListToEdit({...listToEdit, [name]: value} as List)
    }

    const handleSubmitListEdit = (e: React.FormEvent) => {
        e.preventDefault()
        handleEditList(listToEdit as List)
        setListToEdit(null)
        setShowEditForm(false)
    }

    return (
        <PrivateLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 25, py: '10px', fontWeight: 'bold' }} variant='overline'>{user?.username}'s Todo Lists</Typography>
                <Box sx={{ px: '20px', py: '20px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                    {lists.length === 0 ? <EmptyState message="You do not have any lists, create one to start!" /> : lists.map(list => {
                        return (
                            <ListCard handleOpenEditForm={handleOpenEditForm} key={list.id} list={list} handleDelete={handleOpenDeleteConfirm} />
                        )
                    })}
                </Box>
                {/* BOTONERA */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 5 }}>
                    <Button onClick={handleOpenNewListForm} variant='contained'>Create New List</Button>
                </Box>
                {/* FORMULARIO NUEVA LISTA */}
                <Dialog open={showNewListForm} onClose={handleOpenNewListForm}>
                    <DialogTitle>New List</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='form' onSubmit={handleSubmitNewList} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} variant='standard' required />
                            <TextField label='Description' value={description} onChange={(e) => setDescription(e.target.value)} variant='standard' />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewListForm} variant='contained'>Cancel</Button>
                        <Button type='submit' form='form' variant='contained'>Create</Button>
                    </DialogActions>
                </Dialog>
                {/* CONFIRMACIÓN ELIMINAR LISTA */}
                <Dialog
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
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
                        <Button onClick={() => handleDelete(listToDelete as List)}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* FORMULARIO EDICIÓN LISTA */}
                <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                    <DialogTitle>Edit List</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='editForm' onSubmit={handleSubmitListEdit} sx={{ display: 'flex', gap: 5 }}>
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