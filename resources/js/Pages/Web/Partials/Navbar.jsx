import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import {Link} from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';
import {navbar, web} from "@/Pages/Web/Styles/Styles";
import CloseIcon from '@mui/icons-material/Close';
import OrderStepper from '../OrderStepper/OrderStepper';

export default function Navbar({ servicesSectionRef, contactSectionRef, aboutSectionRef, questionSectionRef, mapSectionRef }) {
    const theme = useTheme()
    const [openStepperModal, setOpenStepperModal] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const handleServices = () => {
        console.log(servicesSectionRef.current)
        if (servicesSectionRef.current) {
          servicesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
        }else
        {
            console.log('not working');
        }
      }

      const handleContacts = () => {
        console.log(contactSectionRef.current)
        if (contactSectionRef.current) {
            contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }else
        {
            console.log('not working');
        }
      }

      const handleAbout = () => {

        if (aboutSectionRef.current) {
            aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }else
        {
            console.log('not working');
        }
      }

      const handleQuestion = () => {

        if (questionSectionRef.current) {
            questionSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }else
        {
            console.log('not working');
        }
      }

      const handleMap = () => {
        if (mapSectionRef.current) {
            mapSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }else
        {
            console.log('not working');
        }
      }

    return (
        <div>
        <AppBar position="static" sx={navbar}>
            <Container maxWidth="lg"> {/* You can adjust the maxWidth as needed */}
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        <Link href={route('home')} style={{textDecoration: 'none', color: 'white'}}>
                        <img src="img/logo2.png" style={{width:'180px'}}/>

                        </Link>
                    </Typography>
                    <Box
                            sx={{
                                [theme.breakpoints.down('md')]: {
                                    display: 'none'
                                }

                            }}
                        >
                          <Button color="inherit" sx={{'&:hover': {
                                    color: '#FFC300', // Change the color on hover
                                },}}
                                onClick={handleMap}>
                                Principala
                          </Button>

                          <Button
                            color="inherit"
                            sx={{
                                '&:hover': {
                                    color: '#FFC300', // Change the color on hover
                                },
                            }}
                            onClick={handleServices}
                            >
                            Servicii
                        </Button>
                        <Button color="inherit"  sx={{'&:hover': {
                                    color: '#FFC300', // Change the color on hover
                                },}}
                                onClick={handleAbout}>
                                Despre Noi
                        </Button>
                        <Button color="inherit"  sx={{'&:hover': {
                                    color: '#FFC300', // Change the color on hover
                                },}}
                                onClick={handleContacts}>
                                Contacte
                        </Button>
                        <Button color="inherit"  sx={{'&:hover': {
                                    color: '#FFC300', // Change the color on hover
                                },}}
                                onClick={handleQuestion}>
                                Intrebari Frecvente
                        </Button>
                    </Box>
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon
                            sx={{
                                color: '#fff',
                                [theme.breakpoints.up('md')]: {
                                    display: 'none'
                                }
                            }}
                        />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
            <Drawer variant='temporary'
                    open={open}
                    anchor="right"
                    sx={{
                        [`& .MuiDrawer-paper`]: {width: '100%'}
                    }}
                    PaperProps={{
                        sx: {
                            background: web.bgBlue
                        }
                    }}
            >
                <Box sx={{mt: 3, display: 'flex', flexDirection: 'column', alignItems:'end'}}>
                    <IconButton sx={{color: '#fff', padding:'0px 15px'}}
                                onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{mt: 3, display: 'flex', flexDirection: 'column' ,fontSize:'40px'}}>
                    <Button color="inherit" sx={{color: 'white',borderBottom: '1px solid white',fontSize:'23px','&:hover': {
                            color: '#FFC300', // Change the color on hover
                        },}}
                            onClick={handleMap}>
                        Principala
                    </Button>

                    <Button
                        color="inherit"
                        sx={{color: 'white',borderBottom: '1px solid white',fontSize:'23px',
                            '&:hover': {
                                color: '#FFC300', // Change the color on hover
                            },
                        }}
                        onClick={handleServices}
                    >
                        Servicii
                    </Button>
                    <Button color="inherit"  sx={{color: 'white',borderBottom: '1px solid white',fontSize:'23px','&:hover': {
                            color: '#FFC300', // Change the color on hover
                        },}}
                            onClick={handleAbout}>
                        Despre Noi
                    </Button>
                    <Button color="inherit"  sx={{color: 'white',borderBottom: '1px solid white',fontSize:'23px','&:hover': {
                            color: '#FFC300', // Change the color on hover
                        },}}
                            onClick={handleContacts}>
                        Contacte
                    </Button>
                    <Button color="inherit"  sx={{color: 'white',borderBottom: '1px solid white',fontSize:'23px','&:hover': {
                            color: '#FFC300', // Change the color on hover
                        },}}
                            onClick={handleQuestion}>
                        Intrebari Frecvente
                    </Button>


                </Box>
            </Drawer>
        <OrderStepper onClose={() => setOpenStepperModal(false)} openStepperModal={openStepperModal}/>
        </div>
    );
}

