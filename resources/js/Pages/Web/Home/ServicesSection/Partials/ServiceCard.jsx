import React from 'react';
import {Card, CardContent, Icon, Typography, useTheme} from '@mui/material';
import {web} from "@/Pages/Web/Styles/Styles";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const serviceCard = {
    serviceCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2px',
        backgroundColor: web.bgGrayDark
    },
    icon: {
        fontSize: 148,
    },
    subtitle: {
        color: web.textBlue
    }
}

export default function ServiceCard({service}) {
    const theme = useTheme()
    return (
        <>
            <Card style={serviceCard.serviceCard} elevation={0}>
            <img src={service.image} alt="Service Image" />
                <CardContent>
                    <Typography>{service.tagline}</Typography>
                    <Typography
                     style={serviceCard.subtitle} 
                     sx={{fontSize:'20px',fontWeight:'bold',fontFamily:'serif',
                     [theme.breakpoints.down('md')]:{
                        display:'none'
                    }
                     }}>{service.serviceName}</Typography>
                     <Typography sx={{fontWeight:'bold'}}>
                        ({service.price})
                     </Typography>
                      <Accordion
                      elevation={0}
                      sx={{
                       
                        [theme.breakpoints.up('md')]: {
                            display:'none'
                        },
                        mt:-6
                      }}
                      >
                        <AccordionSummary
                        sx={{ background:'#0051A8',}}
                        expandIcon={<ExpandMoreIcon sx={{color:'#FDBC0E'}} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography color="#FDBC0E" fontWeight="bold">Apasă aici pentru a descoperi</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography
                     style={serviceCard.subtitle} 
                     sx={{fontSize:'20px',fontWeight:'bold',fontFamily:'serif',
                     }}>{service.serviceName}</Typography>
                     <Typography sx={{mt:3}}>
                     {service.paragraph} 
                     </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Typography
                    sx={{
                        [theme.breakpoints.down('md')]:{
                            display:'none'
                        }
                    }}
                    >{service.paragraph}</Typography>
                </CardContent>
            </Card>

        </>

    );
}

