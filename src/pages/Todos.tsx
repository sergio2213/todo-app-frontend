import { PrivateLayout } from "../layout/PrivateLayout"
import { Box, Button, Card, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from "react-router-dom"
import { useTodos } from "../hooks/useTodos"
import { EmptyState } from "../components/EmptyState"

export interface Todo {
    id: number
    todoListId: number
    title: string
    description: string
    isCompleted: boolean
}

export const Todos = () => {
    const {
        todoList,
        todos,
        title,
        setTitle,
        description,
        setDescription,
        showNewTodoForm,
        setShowNewTodoForm,
        showDeleteConfirm,
        setShowDeleteConfirm,
        showEditForm,
        setShowEditForm,
        handleCreateTodo,
        handleDeleteTodo,
        itemToDelete,
        setItemToDelete,
        itemToEdit,
        setItemToEdit,
        handleUpdateIsCompleted,
        handleUpdateTodo

    } = useTodos()

    const handleCancelNewTodo = () => {
        setTitle('')
        setDescription('')
        setShowNewTodoForm(false)
    }

    const handleSubmitNewTodo = (e: React.FormEvent) => {
        e.preventDefault()
        handleCreateTodo()
        setTitle('')
        setDescription('')
        setShowNewTodoForm(false)
    }

    const handleDelete = (todo: Todo) => {
        handleDeleteTodo(todo)
        console.log(todo.id)
        setShowDeleteConfirm(false)
    }

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault()
        handleUpdateTodo(itemToEdit as Todo)
        setItemToEdit(null)
        setShowEditForm(false)
    }

    const handleOpenNewTodoForm = () => {
        setShowNewTodoForm(true)
    }

    const handleItemClick = (todo: Todo) => {
        handleUpdateIsCompleted(todo)
    }

    const handleShowDeleteConfirm = (todo: Todo) => {
        setItemToDelete(todo)
        setShowDeleteConfirm(true)
    }

    const handleHideDeleteConfirm = () => {
        setShowDeleteConfirm(false)
    }

    const handleOpenEditForm = (todo: Todo) => {
        setItemToEdit(todo)
        // setTitle(todo.title)
        // setDescription(todo.description)
        setShowEditForm(true)
    }

    const handleCloseEditForm = () => {
        setShowEditForm(false)
        setItemToEdit(null)
    }

    const handleItemToEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target
        setItemToEdit({...itemToEdit, [name]: value} as Todo)
    }

    return (
        <PrivateLayout>
            <Card>
                <CardHeader>
                    <div>{todoList?.title as string}</div>
                </CardHeader>
                <List>
                    {todos.length === 0 ? <EmptyState message="You do not have any todos, create one to start!" /> : todos.map(todo => {
                        return (
                            <ListItem
                                key={todo.id}
                                secondaryAction={
                                    <>
                                        <IconButton onClick={() => handleOpenEditForm(todo)} edge="end">
                                            <ModeEditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleShowDeleteConfirm(todo)} edge="end">
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                                disablePadding
                            >
                                <ListItemButton onClick={() => handleItemClick(todo)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={todo.isCompleted}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': todo.title }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={todo.title} secondary={todo.description ? todo.description : null} />
                                </ListItemButton>


                            </ListItem>
                        )
                    })}
                </List>
                { /* BOTONERA */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
                    <Button onClick={handleOpenNewTodoForm} variant='contained'>Create Todo</Button>
                    <Button variant='contained'>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/lists'>Back to Lists</Link>
                    </Button>
                </Box>

                {/* FORMULARIO NUEVA TODO */}
                <Dialog open={showNewTodoForm} onClose={handleCancelNewTodo}>
                    <DialogTitle>New Todo</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='form' onSubmit={handleSubmitNewTodo} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} variant='standard' required />
                            <TextField label='Description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} variant='standard' />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelNewTodo} variant='contained'>Cancel</Button>
                        <Button type='submit' form='form' variant='contained'>Create</Button>
                    </DialogActions>
                </Dialog>
                {/* CONFIRMACIÓN ELIMINAR TODO */}
                <Dialog
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                >
                    <DialogTitle>
                        Warning
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Delete '{itemToDelete?.title}'?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleHideDeleteConfirm}>Cancel</Button>
                        <Button onClick={() => handleDelete(itemToDelete as Todo)}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* MOSTRAR FORMULARIO EDICIÓN TODO */}
                <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                    <DialogTitle>Update Todo</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='editForm' onSubmit={handleEdit} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' name='title' value={itemToEdit?.title} onChange={handleItemToEditChange} variant='standard' required />
                            <TextField label='Description' name='description' value={itemToEdit?.description} onChange={handleItemToEditChange} variant='standard' />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditForm} variant='contained'>Cancel</Button>
                        <Button type='submit' form='editForm' variant='contained'>Update</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </PrivateLayout>
    )
}