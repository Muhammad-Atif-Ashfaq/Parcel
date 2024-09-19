import React from 'react';
import {Box, Hidden, Typography, useTheme} from '@mui/material';
import {web} from "@/Pages/Web/Styles/Styles";
import './styles.css'
import { yellow } from '@mui/material/colors';
import Lottie from 'react-lottie';
import Veloce from './Veloce.json'


export default function BannerSection({mapSectionRef}) {
    const theme = useTheme()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Veloce,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <>
            <div
            ref={mapSectionRef}
                className="header"
                id="header"
                style={{
                    [theme.breakpoints.down('sm')]: {
                        height: '300px',
                    },
                }}
            >
                <div className="header-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-xl-12">
                                <div className="text-container">
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: "space-around",
                                        px: 10,
                                        [theme.breakpoints.down('md')]: {
                                            padding: '0 30px 0 15px',

                                        },
                                        [theme.breakpoints.down('sm')]: {
                                            padding: '0 30px 0 15px',
                                            flexDirection:'column'
                                        }
                                    }}>
                                        <Box sx={{
                                            [theme.breakpoints.down('md')]: {
                                                         display:'none',

                                                     }}}>
                                                            <Lottie
                                                            style={{marginTop:'-30px'}}
                                                            options={defaultOptions}
                                                                    height={350}
                                                                    width={350}
                                                                    />
                                        </Box>
                                        <Box sx={{
                                            [theme.breakpoints.up('md')]: {
                                                         display:'none',

                                                     },
                                                     [theme.breakpoints.down('sm')]: {
                                                        display:'none',

                                                    },
                                                    }}

                                                     >
                                                            <Lottie
                                                            style={{marginTop:'10px'}}
                                                            options={defaultOptions}
                                                                    height={200}
                                                                    width={200}
                                                                    />
                                        </Box>
                                        <Box sx={{
                                            [theme.breakpoints.up('sm')]: {
                                                         display:'none',

                                                     }}}>
                                                            <Lottie
                                                            style={{marginTop:'5px'}}
                                                            options={defaultOptions}
                                                                    height={150}
                                                                    width={300}
                                                                    />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex', justifyContent: "center", pt: 5, width: '50%',
                                            [theme.breakpoints.down('md')]: {
                                                width:'80%',
                                                pt:3,
                                                mt:10
                                            },
                                            [theme.breakpoints.down('sm')]: {
                                                width:'100%',
                                                pt:3,
                                                mt:-4
                                            }

                                        }}>
                                            <Box>

                                                <Typography sx={{
                                                    color: '#fff',
                                                    fontSize: '32px',
                                                    [theme.breakpoints.down('md')]: {
                                                        fontSize: '18px'
                                                    },
                                                    [theme.breakpoints.down('sm')]: {
                                                        fontSize: '15px',
                                                        mt:3
                                                    }


                                                }} variant='h4' fontWeight='bold'>
                                                    Primii care unesc fiecare colț al
                                                    <b style={{color:'#FFBF00'}}> Moldovei </b>
                                                    și   <b style={{color:'#FFBF00'}}> Angliei </b>
                                                </Typography>
                                                <Typography sx={{
                                                    color: '#fff', mt: 1, mb: 2, fontWeight: 'bold',
                                                    [theme.breakpoints.down('md')]: {
                                                        fontSize: '13px'
                                                    },
                                                    [theme.breakpoints.down('sm')]: {
                                                        fontSize: '13px'
                                                    }
                                                }}>
                                                    Mai mult de <b style={{color:'#FFBF00',fontWeight:'bolder',}}>50 PUNCTE DE COLECTARE ȘI LIVRARE</b> in Anglia si Moldova
                                                    <br/>
                                                    Mai mult de <b style={{color:'#FFBF00',fontWeight:'bolder',}}>40 SOFERI REGIONALI</b> in Anglia si Moldova.

                                                </Typography>
                                                <Box sx={{
                                                    display: 'flex',
                                                    // justifyContent:'center',
                                                    ml:5,
                                                    [theme.breakpoints.down('sm')]: {
                                                        flexDirection: 'column',
                                                        gap:'5px',
                                                        ml:'30%'
                                                        // paddingLeft: '10px',

                                                    }

                                                }}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems:'center',

                                                    }}>
                                                        <Box sx={{
                                                            background: '#FFBF00',
                                                            ml: 1,
                                                            borderRadius: '15px',
                                                            width: '40px',
                                                            [theme.breakpoints.down('md')]: {
                                                                width: '25px',
                                                                height: '15px',
                                                                borderRadius: '7px',
                                                                mb:2

                                                            }
                                                        }}>
                                                            <Typography sx={{
                                                                [theme.breakpoints.down('sm')]: {
                                                                    fontSize: '13px'
                                                                }, [theme.breakpoints.down('md')]: {
                                                                    fontSize: '10px'
                                                                },

                                                            }}>

                                                                <img
                                                                    src='img/uk-square.png'
                                                                    alt={`img/uk.png Flag`}
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '25px',
                                                                        borderRadius: '7px',
                                                                    }}
                                                                />

                                                            </Typography>
                                                        </Box>
                                                        <Typography sx={{
                                                            ml: 1,
                                                            color: web.textWhite,
                                                            [theme.breakpoints.down('md')]: {
                                                                fontSize: '15px',
                                                            }, [theme.breakpoints.down('sm')]: {
                                                                fontSize: '18px'
                                                            },

                                                        }}><a href={`tel:+447884876644`}>+447884876644</a></Typography>
                                                    </Box>
                                                    <Box sx={{display: 'flex',
                                                        alignItems:'center'}}>
                                                        <Box sx={{
                                                            background: '#FFBF00',
                                                            ml: 1,
                                                            borderRadius: '15px',
                                                            width: '40px',
                                                            [theme.breakpoints.down('md')]: {
                                                                width: '25px',
                                                                height: '15px',
                                                                borderRadius: '7px',
                                                                mb:2

                                                            }
                                                        }}>
                                                            <Typography sx={{
                                                                [theme.breakpoints.down('sm')]: {
                                                                    fontSize: '13px'
                                                                }, [theme.breakpoints.down('md')]: {
                                                                    fontSize: '15px'
                                                                }
                                                            }}>

                                                                <img
                                                                    src='img/uk-square.png'
                                                                    alt={`img/moldova.png Flag`}
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '25px',
                                                                        borderRadius: '7px',
                                                                    }}
                                                                />
                                                            </Typography>
                                                        </Box>
                                                        <Typography sx={{
                                                            ml: 1,
                                                            color: web.textWhite,
                                                            [theme.breakpoints.down('md')]: {
                                                                fontSize: '15px'
                                                            }, [theme.breakpoints.down('sm')]: {
                                                                fontSize: '18px'
                                                            }
                                                        }}><a href={`tel:+447407363388`}>+447407363388</a></Typography>
                                                    </Box>
                                                    <Box sx={{display: 'flex',
                                                        alignItems:'center'}}>
                                                        <Box sx={{
                                                            background: '#FFBF00',
                                                            ml: 1,
                                                            borderRadius: '15px',
                                                            width: '40px',
                                                            [theme.breakpoints.down('md')]: {
                                                                width: '25px',
                                                                height: '15px',
                                                                borderRadius: '7px',
                                                                mb:2

                                                            }
                                                        }}>
                                                            <Typography sx={{
                                                                [theme.breakpoints.down('sm')]: {
                                                                    fontSize: '13px'
                                                                }, [theme.breakpoints.down('md')]: {
                                                                    fontSize: '10px'
                                                                }
                                                            }}>

                                                                <img
                                                                    src='img/moldova-square.png'
                                                                    alt={`img/moldova.png Flag`}
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '25px',
                                                                        borderRadius: '7px',
                                                                    }}
                                                                />
                                                            </Typography>
                                                        </Box>
                                                        <Typography sx={{
                                                            ml: 1,
                                                            color: web.textWhite,
                                                            [theme.breakpoints.down('md')]: {
                                                                fontSize: '15px'
                                                            }, [theme.breakpoints.down('sm')]: {
                                                                fontSize: '18px'
                                                            }
                                                        }}><a href={`tel:+37368249444`}>+37368249444</a></Typography>
                                                    </Box>
                                                </Box>

                                            </Box>

                                        </Box>
                                    </Box>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <svg
                className="header-frame"
                data-name="Layer 1"
                preserveAspectRatio="none"
                viewBox="0 0 1920 310"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs/>
                <title>header-frame</title>
                <path
                    className="cls-1"
                    d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"
                    fill="#0051A8"
                />
            </svg>
        </>
    );
};


