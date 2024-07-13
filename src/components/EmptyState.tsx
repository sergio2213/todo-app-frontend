import { Box, Typography } from "@mui/material"

interface EmptyStateProps {
    message: string
}

export const EmptyState = ({ message }: EmptyStateProps) => {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4
        }}>
            <Typography variant='h6'>{message}</Typography>
        </Box>
    )
}