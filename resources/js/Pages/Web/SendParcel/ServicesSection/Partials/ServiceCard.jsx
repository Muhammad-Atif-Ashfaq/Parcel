import React, {useState} from 'react';
import {Box, Card, CardContent, Dialog, DialogContent, DialogTitle, Icon, Typography} from '@mui/material';
import {web} from "@/Pages/Web/Styles/Styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link} from "@inertiajs/react";

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
        fontSize: 148, // Adjust icon size as needed
    },
    subtitle: {
        color: web.textBlue
    }
}


export default function ServiceCard({service}) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isService, setIsService] = useState('');

    const serviceSubmit = (key) => {
        setDialogOpen(true)
        setIsService(key);
    }
    return (
        <>
            <Card style={serviceCard.serviceCard} elevation={0} onClick={() => serviceSubmit(service.key)}>
                <Icon style={serviceCard.icon}>{service.icon}</Icon>
                <CardContent>
                    <Typography>{service.tagline}</Typography>
                    <Typography style={serviceCard.subtitle}>{service.serviceName}</Typography>
                    <Typography>{service.paragraph}</Typography>
                </CardContent>
            </Card>
            <Dialog fullWidth open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Select</DialogTitle>
                <DialogContent>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                    }}>
                        <Link href={route('order.index', [isService, 'UK-to-Moldova'])}>
                            <Card style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                backgroundColor: '#d3d3d3'
                            }} elevation={0}>
                                <Icon style={{fontSize: '148', height: '100px', width: '100px', padding: '5px'}}>{
                                    <LocationOnIcon sx={{fontSize: '9vh'}}/>}</Icon>
                                <CardContent>
                                    <Typography variant='h4'>UK to Moldova</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href={route('order.index', [isService, 'Moldova-to-UK'])}>
                            <Card style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                backgroundColor: '#d3d3d3'
                            }} elevation={0}>
                                <Icon style={{fontSize: '148', height: '100px', width: '100px', padding: '5px'}}>{
                                    <LocationOnIcon sx={{fontSize: '9vh'}}/>}</Icon>
                                <CardContent>
                                    <Typography variant='h4'>Moldova to UK</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Box>
                </DialogContent>
            </Dialog>
        </>

    );
}

