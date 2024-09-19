import React, {useEffect, useState} from "react";

import {Link} from "@inertiajs/react";
import {AppBar, Box, Button, Grid, styled, Toolbar, Typography, useTheme} from "@mui/material";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import logo from "../../../../../public/img/logo2.png";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import uk from "../../../../../public/img/uk-square.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moldova from "../../../../../public/img/moldova-square.png";
import {ArrowBack} from "@mui/icons-material";

const StyledRoot = styled(Box)(({theme}) => ({
    minHeight: "100vh",
}));
const StyledBox = styled(Box)(({theme}) => ({
    height: "60vh",
    background: "#0051A8",
    [theme.breakpoints.down('md')]: {
        height:'40vh'
    }
}));
const StyledBottom = styled(Box)(({theme}) => ({
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
export default function OrderConfrem({outh, id, CollectionPoints, order}) {
    console.log(order);
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    console.log(order.order);
    return (
        <>
            <StyledRoot>

                <AppBar
                    sx={{
                        background: '#0051A8'
                    }}
                >
                    <Toolbar>
                        <img src={logo} style={{height: '50px'}}/>
                        <Link href={route("home")} style={{marginLeft: 'auto'}}>
                            <Button
                                variant='contained'
                                sx={{
                                    background: '#FCBC0E',
                                    color: '#000',
                                    '&:hover': {
                                        background: '#000',
                                        color: '#FCBC0E'
                                    }
                                }}
                                startIcon={
                                    <ArrowBack/>
                                }
                            >Back to home </Button>
                        </Link>
                    </Toolbar>
                </AppBar>

                <StyledBox>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{mt: 15}}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#ffc00c",
                                    textAlign: "center",
                                    [theme.breakpoints.down('md')]: {
                                        fontSize:'5rem'
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize:'3rem'
                                    },
                                }}
                            >
                                Vă Mulțumim!
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: "#fff",
                                    textAlign: "center",
                                    mt: 0.5,
                                    
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize:'1.15rem'
                                    },
                                }}
                            >
                                pentru Alegerea Veloce Plus!
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold",
                                    color: "#ffc00c",
                                    textAlign: "center",
                                }}>
                                Order Id : <b>{order.id}</b>
                            </Typography>
                           
                        </Box>
                    </Box>
                </StyledBox>
                <Grid container spacing={5} sx={{mt:5}}>
                    <Grid item xs={12} md={12} lg={12}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'center',
                            width: "65%",
                            mx:'auto',
                            [theme.breakpoints.down('md')]: {
                                width: "85%",

                            }
                        }}
                    >
                        <MarkEmailReadIcon sx={{fontSize: "7rem",
                        [theme.breakpoints.down('md')]: {
                            fontSize:'5rem'
                        }
                    }}/>
                        <Typography sx={{ml: 3}} variant="h6">
                            Stimate Client, ID-ul unic al comenzii dumneavoastră
                            este:
                            <b>{order.id}</b>
                            <FeaturedVideoIcon sx={{mx: 0.5, mb: 0.5}}/>
                            Coletele dumnevoastra vor fi in drum spre
                            <b style={{margin: "0px 5px"}}>
                                {order.order_destination}
                            </b>
                            {order.order_destination == "UK-to-Moldova" ? (
                                <>
                                    (
                                    <img
                                        src={uk}
                                        style={{
                                            height: "15px",
                                            display: "inline",
                                            margin: "0 5px",
                                        }}
                                    />{" "}
                                    <ArrowForwardIcon/>
                                    <img
                                        src={moldova}
                                        style={{
                                            height: "15px",
                                            display: "inline",
                                            margin: "0 5px",
                                        }}
                                    />
                                    )
                                </>
                            ) : (
                                <>
                                    (
                                    <img
                                        src={moldova}
                                        style={{
                                            height: "15px",
                                            display: "inline",
                                            margin: "0 5px",
                                        }}
                                    />{" "}
                                    <ArrowForwardIcon/>
                                    <img
                                        src={uk}
                                        style={{
                                            height: "15px",
                                            display: "inline",
                                            margin: "0 5px",
                                        }}
                                    />
                                    )
                                </>
                            )}
                        </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:'center',
                            width: "55%",
                            mx:'auto',
                            [theme.breakpoints.down('md')]: {
                                width: "85%",
                            },
                        }}
                    >
                        <Typography sx={{ml: 3}} variant="h6">
                            {order.service == "CTC"
                                ? "Stimate Client, vă rugăm să vă deplasați la punctul de colectare indicat mai jos, dar și în e-mailul vostru. Prezentați ID-ul unic al comenzii pentru expediere."
                                : order.service == "CTD"
                                    ? "Stimate Client vă rugăm să vă deplasați la punctul de colectare indicat mai jos, dar și în e-mailul vostru. Prezentați ID-ul unic al comenzii pentru expediere. După aceea, veți primi un e-mail de confirmare. Destinatarul va fi contactat de un șofer Veloce Link pentru a stabili un moment potrivit pentru livrare la domiciliu, necesitând confirmarea numelui și ID-ului unic."
                                    : order.service == "DTC"
                                        ? "Stimate Client, expeditorul va fi contactat de un șofer Veloce Link pentru a stabili un moment potrivit pentru livrare la domiciliu, necesitând confirmarea ID-ului unic. Peste câteva zile, destinatarul va fi notificat prin e-mail când coletul ajunge la punctul de colectare apropiat. Pentru ridicarea coletului, destinatarul trebuie să confirme ID-ul comenzii și numele său."
                                        : "Stimate Client, echipa Veloce Plus vă va contacta în curând pentru a confirma detaliile comenzii, inclusiv ziua și ora colectării coletului de la domiciliu. Peste câteva zile, destinatarul va fi informat despre statusul acestuia. La apropierea de destinație, destinatarul va stabili ziua și ora livrării la domiciliu. La primire, este necesară confirmarea ID-ului unic al comenzii și a numelui."}
                        </Typography>
                        <LocationOnIcon sx={{fontSize: "7rem",
                        [theme.breakpoints.down('md')]: {
                            fontSize:'5rem'
                        }
                    }}/>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{display:'flex', justifyContent:'center'}}>
                <Box sx={{background: '#0051A8', mx: 10, height: 'auto', mb: 5, color: '#fff', width:'100%',
                [theme.breakpoints.down('md')]: {
                    mx:5
                }
            }}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', py: 3, 
                    [theme.breakpoints.down('md')]: {
                        flexDirection:'column',
                    
                    }
                }}>
                        <Box sx={{borderRight: '1px dashed yellow', width: '50%', height: 'auto', px: 10,
                        
                            [theme.breakpoints.down('md')]: {
                                borderRight:'none',
                                borderBottom:'1px dashed yellow',
                                pb:3,
                                 mb:3,
                                 width:'100%',
                                 px:5
                            }
                    }}>
                            <Typography variant="h6" fontWeight="bold" sx={{
                                mb: 2,
                                color: "#ffc00c",
                            }}>
                                Detalii Punct de Expediere:
                            </Typography>
                            {(order.recipient.sender_collection_point ?
                                    (
                                        <>
                                            <Typography>
                                                Adresa: {order.recipient.sender_collection_point ? order.recipient.sender_collection_point.address : 'Not Found'}
                                            </Typography>
                                            <Typography>
                                                Destinaţie: {order.recipient.sender_collection_point ? order.recipient.sender_collection_point.sides : 'Not Found'}
                                            </Typography>
                                            <Typography>
                                                Telefon: {order.recipient.sender_collection_point ? order.recipient.sender_phone : 'Not Found'}
                                            </Typography>
                                            <Typography>
                                            Punct de colectare: {order.recipient.sender_collection_point ? order.recipient.sender_collection_point.name : 'Not Found'}
                                            </Typography>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Typography>
                                                Veți fi contactat(ă) de unul din șoferii noștri în scurt timp pentru a
                                                confirma comanda! Vă mulțumim! <AirportShuttleIcon sx={{
                                                color: "#ffc00c",
                                            }}/>
                                            </Typography>
                                        </>
                                    )
                            )}

                        </Box>
                        <Box sx={{width: '50%', height: 'auto', px: 10, 
                        [theme.breakpoints.down('md')]: {
                            pb:3,
                             mb:3,
                             width:'100%',
                             px:5
                        }
                    }}>
                            <Typography variant="h6" fontWeight="bold" sx={{
                                mb: 2,
                                color: "#ffc00c",
                            }}>
                                Detalii Punct de Primire:
                            </Typography>
                            {(order.recipient.reciever_collection_point ?
                                    (
                                        <>
                                            <Typography>
                                                Adresa: {order.recipient.reciever_collection_point ? order.recipient.reciever_collection_point.address : 'Not Found'}
                                            </Typography>
                                            <Typography>
                                                Destinaţie: {order.recipient.reciever_collection_point ? order.recipient.reciever_collection_point.sides : 'Not Found'}
                                            </Typography>
                                            <Typography>
                                                Telefon: {order.recipient.reciever_collection_point ? order.recipient.receiver_phone : 'Not Found'}
                                            </Typography>
                                            <Typography>
                                            Punct de colectare: {order.recipient.reciever_collection_point ? order.recipient.reciever_collection_point.name : 'Not Found'}
                                            </Typography>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Typography>
                                                Veți fi contactat(ă) de unul din șoferii noștri în scurt timp pentru a
                                                confirma comanda! Vă mulțumim! <AirportShuttleIcon sx={{
                                                color: "#ffc00c",
                                            }}/>
                                            </Typography>
                                        </>
                                    )
                            )}

                        </Box>
                    </Box>
                </Box>
                    </Grid>
                </Grid>
               
                <Box sx={{px: 15, mb: 5, 
                [theme.breakpoints.down('md')]:{
                    px:5
                }
                }}>
                    <Typography textAlign="center" fontWeight="bold" variant="h5" color="#0051A8">
                        Vă mulțumim că ați ales Veloce Plus și vă dorim o experiență plăcută în continuare!
                        Cu respect,
                        Echipa Veloce Plus
                    </Typography>
                </Box>
            </StyledRoot>
        </>
    );
}
