import React from 'react';
import {Container, Grid, Typography} from '@mui/material';
import ServiceCard from './Partials/ServiceCard'; // Import your ServiceCard component
import {web} from "@/Pages/Web/Styles/Styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const services = [
    {
        heading: 'Collection Point to Collection Point',
        subtitle: 'Service 1',
        icon: <LocationOnIcon sx={{fontSize: '9vh'}}/>,
        serviceName: 'Service Name 1',
        tagline: 'Door to Door',
        key: 'DTD',
        paragraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,.',
    },
    {
        heading: 'Collection Point to Collection Point',
        subtitle: 'Service 1',
        icon: <LocationOnIcon sx={{fontSize: '9vh'}}/>,
        serviceName: 'Service Name 1',
        tagline: 'Collection Point to Collection Point',
        key: 'CTC',
        paragraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,.',
    },
    {
        heading: 'Collection Point to Collection Point',
        subtitle: 'Service 1',
        icon: <LocationOnIcon sx={{fontSize: '9vh'}}/>,
        serviceName: 'Service Name 1',
        tagline: 'Collection Point to Door',
        key: 'CTD',
        paragraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,.',
    },
    {
        heading: 'Collection Point to Collection Point',
        subtitle: 'Service 1',
        icon: <LocationOnIcon sx={{fontSize: '9vh'}}/>,
        serviceName: 'Service Name 1',
        tagline: 'Door to Collection Point',
        key: 'DTC',
        paragraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, .',
    },
];
const servicesSection = {
    container: {
        textAlign: 'center',
        padding: '2rem',

    },
    background: {
        backgroundColor: web.bgGray,
    },
    h4: {
        color: web.textBlue
    }
}

function ServicesSection() {

    return (
        <>
            <div style={servicesSection.background}>
                <Container sx={servicesSection.container}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={servicesSection.h4}>
                        Our Services
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Choose from our range of services
                    </Typography>
                    <Grid container spacing={2}>
                        {services.map((service, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <ServiceCard service={service}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>

        </>
    );
}

export default ServicesSection;
