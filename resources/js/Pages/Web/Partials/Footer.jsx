import React from 'react';
import {Box, Button, Container, Divider, Grid, Stack, Typography, useTheme} from "@mui/material";
import {web} from "@/Pages/Web/Styles/Styles";
import ScrollToTopButton from "@/Pages/Web/ScrollToTopButton";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
export default function Footer({ servicesSectionRef, contactSectionRef, aboutSectionRef, questionSectionRef, mapSectionRef }) {

const theme = useTheme()
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
        <>
            <ScrollToTopButton/>
            <Box sx={{
                backgroundColor: '#FFC617',
                height:'28vh',
                [theme.breakpoints.down('sm')]: {
                    height:'35vh'
                }
            }}>
                <Grid container spacing={3}
                sx={{
                    paddingX: '50px',
                    height:'10vh'
                }}
                >
                    <Grid item xs={6} md={3} lg={2}>
                    <Typography sx={{fontWeight:'bold', cursor:'pointer'}} onClick={handleMap}>
                            PRINCIPALA
                            </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                    <Typography sx={{fontWeight:'bold', cursor:'pointer'}} onClick={handleServices}>
                    SERVICII
                            </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                    <Typography sx={{fontWeight:'bold', cursor:'pointer'}} onClick={handleAbout}>
                    DESPRE NOI
                            </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                    <Typography sx={{fontWeight:'bold', cursor:'pointer'}} onClick={handleContacts}>
                    CONTACTE
                            </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                    <Typography sx={{fontWeight:'bold', cursor:'pointer'}} onClick={handleQuestion}>
                    INTREBARI FRECTVENTE
                            </Typography>
                    </Grid>
                </Grid>
                    <Divider />
                <Container sx={{display:'flex', justifyContent:'center',
                    [theme.breakpoints.down('md')]: {
                        flexDirection:'column'
                    }
                }}>
                    <Box sx={{
                        display:'flex',
                        justifyContent:'center',
                        [theme.breakpoints.down('sm')]: {
                            width:'100px',
                            display:'flex',
marginLeft:'10rem',
                            marginTop:'50px'
                        }
                    }}>
                <img src='img/logo.png' style={{marginTop:15,width:'230px', marginRight:'10px' }}/>
                        </Box>

                        <Box sx={{mt:5, display:'flex', justifyContent:'center'}}>
                            <FacebookIcon sx={{mr:3, cursor:'pointer'}} />
                            <TwitterIcon sx={{mr:3, cursor:'pointer'}}/>
                            <LinkedInIcon sx={{mr:3, cursor:'pointer'}}/>
                            <PinterestIcon sx={{mr:3, cursor:'pointer'}}/>
                            <YouTubeIcon sx={{mr:3, cursor:'pointer'}}/>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',
                        [theme.breakpoints.down('md')]: {
                            mt:5
                        }
                    }}>
                        {/* <Button variant='contained'
                        sx={{
                            background:'#000',
                            '&:hover': {
                                background:'#000'
                            }
                        }}
                        startIcon={
                            <ChatBubbleIcon />
                        }
                        >
                            Chat With us
                        </Button> */}
                        </Box>
                </Container>
            </Box>

        </>
    )
}
