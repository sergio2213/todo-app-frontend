import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { List } from "../pages/TodoLists"

interface ListCardProps {
    list: List
    handleDelete: (list: List) => void
    handleOpenEditForm: (list: List) => void
}

export const ListCard = ({ list, handleDelete, handleOpenEditForm }: ListCardProps) => {
    return (
        <Card variant='outlined' sx={{ minWidth: '300px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    List #{list.id}
                </Typography>
                <Typography variant="h5" component="div">
                    {list.title}
                </Typography>
                <Typography color="text.secondary">
                    {list.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button size="small">
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/lists/${list.id}/todos`}>Open</Link>
                </Button>
                <Button size="small" onClick={() => handleDelete(list)}>
                    Delete
                </Button>
                <Button size="small" onClick={() => handleOpenEditForm(list)
                }>
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}