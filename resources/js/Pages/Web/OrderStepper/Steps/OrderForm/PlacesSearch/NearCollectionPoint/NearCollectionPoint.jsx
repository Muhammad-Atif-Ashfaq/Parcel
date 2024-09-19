import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function NearCollectionPoint({name, address, distance, last_collection_day, last_collection_time}) {
    return (
        <Card sx={{marginTop: '5px', backgroundColor: '#'}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                <Typography color="textSecondary">
                    Address: {address}
                </Typography>
                <Typography color="textSecondary">
                    Distance: {distance} km
                </Typography>
                <Typography color="textSecondary">
                Ultima Zi și Oră de Colectare: {last_collection_day} {last_collection_time}
                </Typography>
            </CardContent>
        </Card>
    );
};


