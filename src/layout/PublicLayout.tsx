import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu'

interface PublicLayoutProps {
    children: React.ReactNode
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TODO APP
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >

                                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                </Link>
                                <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Register</Typography>
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TODO APP
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}>
                            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
            <main>
                {children}
            </main>
        </>
    )
}