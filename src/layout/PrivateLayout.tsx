import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Logout } from "@mui/icons-material"
import { useAuth } from "../hooks/useAuth"

interface PrivateLayoutProps {
    children: React.ReactNode
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const auth = useAuth()
    const navigate = useNavigate()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = () => {
        if (auth?.isAuth) {
            auth.logoutAction()
        }
        navigate('/')
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

                                <Link to='/lists' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">My Todo Lists</Typography>
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
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link to='/lists' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    My Todo Lists
                                </Button>
                            </Link>

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={auth?.user?.username.toUpperCase()} sx={{ bgcolor: '#0e8fff' }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>My Profile</Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
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