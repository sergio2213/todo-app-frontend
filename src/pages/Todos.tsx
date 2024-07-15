import { PrivateLayout } from "../layout/PrivateLayout"
import { Box, Button, Card, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from "react-router-dom"
import { useTodos } from "../hooks/useTodos"
import { EmptyState } from "../components/EmptyState"
import { useState } from "react";

export interface Todo {
    id?: number
    todoListId?: number
    title: string
    description: string
    isCompleted?: boolean
}

export const Todos = () => {

    const [showNewTodoForm, setShowNewTodoForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    const {
        todoList,
        todos,
        handleCreateTodo,
        handleDeleteTodo,
        todoToDelete,
        setTodoToDelete,
        todoToEdit,
        setTodoToEdit,
        newTodo,
        setNewTodo,
        handleUpdateIsCompleted,
        handleEditTodo

    } = useTodos()

    // ---------------------------------------- DELETE TODO

    const handleOpenDeleteConfirm = (todo: Todo) => {
        setTodoToDelete(todo)
        setShowDeleteConfirm(true)
    }

    const handleCloseDeleteConfirm = () => {
        setShowDeleteConfirm(false)
        setTodoToDelete({ title: '', description: '' })
    }

    const handleDeleteAction = () => {
        handleDeleteTodo()
        setShowDeleteConfirm(false)
        setTodoToDelete({ title: '', description: '' })
    }

    // ---------------------------------------- EDIT TODO

    const handleOpenEditForm = (todo: Todo) => {
        setTodoToEdit(todo)
        setShowEditForm(true)
    }

    const handleCloseEditForm = () => {
        setShowEditForm(false)
        setTodoToEdit({ title: '', description: '' })
    }

    const handleTodoToEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target
        setTodoToEdit({...todoToEdit, [name]: value} as Todo)
    }

    const handleTodoEditAction = (e: React.FormEvent) => {
        e.preventDefault()
        handleEditTodo()
        setShowEditForm(false)
        setTodoToEdit({ title: '', description: '' })
    }

    const handleItemClick = (todo: Todo) => {
        handleUpdateIsCompleted(todo)
    }

    // ---------------------------------------- CREATE TODO

    const handleOpenNewTodoForm = () => {
        setShowNewTodoForm(true)
    }

    const handleCloseNewTodoForm = () => {
        setShowNewTodoForm(false)
        setNewTodo({ title: '', description: '' })
    }

    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewTodo({ ...newTodo, [name]: value } as Todo)
    }

    const handleCreateTodoAction = (e: React.FormEvent) => {
        e.preventDefault()
        handleCreateTodo()
        setShowNewTodoForm(false)
        setNewTodo({ title: '', description: '' })
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
                                        <IconButton onClick={() => handleOpenDeleteConfirm(todo)} edge="end">
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
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/lists'>
                    <Button variant='contained'>
                        Back to Lists
                    </Button>
                    </Link>
                </Box>

                {/* FORMULARIO NUEVA TODO */}
                <Dialog open={showNewTodoForm} onClose={handleCloseNewTodoForm}>
                    <DialogTitle>New Todo</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='newTodoForm' onSubmit={handleCreateTodoAction} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' name='title' value={newTodo.title} onChange={handleNewTodoChange} variant='standard' required />
                            <TextField label='Description' name='description' value={newTodo.description} onChange={handleNewTodoChange} variant='standard' />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewTodoForm} variant='contained'>Cancel</Button>
                        <Button type='submit' form='newTodoForm' variant='contained'>Create</Button>
                    </DialogActions>
                </Dialog>
                {/* CONFIRMACIÓN ELIMINAR TODO */}
                <Dialog
                    open={showDeleteConfirm}
                    onClose={handleCloseDeleteConfirm}
                >
                    <DialogTitle>
                        Warning
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Delete '{todoToDelete.title}'?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
                        <Button onClick={handleDeleteAction}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* MOSTRAR FORMULARIO EDICIÓN TODO */}
                <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                    <DialogTitle>Update Todo</DialogTitle>
                    <DialogContent>
                        <Box component='form' id='editForm' onSubmit={handleTodoEditAction} sx={{ display: 'flex', gap: 5 }}>
                            <TextField label='Title' name='title' value={todoToEdit.title} onChange={handleTodoToEditChange} variant='standard' required />
                            <TextField label='Description' name='description' value={todoToEdit.description} onChange={handleTodoToEditChange} variant='standard' />
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