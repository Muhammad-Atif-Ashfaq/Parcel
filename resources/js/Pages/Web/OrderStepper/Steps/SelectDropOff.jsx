import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SelectDropOff({ selected, onChange }) {
    const dropOffOptions = [
        { value: "doorstep", label: "Livrare până la ușă", src:"img/door.png"},
        { value: "collectionpoint", label: " Preluare de la punctul de colectare", src:"img/shop.png" },
    ];

    const handleOptionClick = (value) => {
        onChange(value);
    };

    return (
        <Grid container spacing={2}>
            {dropOffOptions.map((option, ind) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={option.value} sx={{ marginTop:'5px'}}>
                    <Card
                        onClick={() => handleOptionClick(option.value)}
                        sx={{
                            cursor: 'pointer',
                            border: `2px solid ${selected === option.value ? 'blue' : 'transparent'}`,
                            height:'15vh'
                        }}
                    >
                         <CardContent sx={{display:'flex', alignItems:'center'}}>
                            <Typography variant="h6">{option.label}</Typography>
                             <img src={option.src} style={{
                                height:ind == 0 ? '70px' :'40px',
                                marginLeft:'10px'
                            }} />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
