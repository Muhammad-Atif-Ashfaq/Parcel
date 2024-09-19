import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export default function SelectCountry({ selected, onChange }) {
    const countries = [
        { value: "UK-to-Moldova", label: "Anglia", flagSrc: "img/uk.png" },
        { value: "Moldova-to-UK", label: "Moldova", flagSrc: "img/moldova.png" }
    ];

    const handleOptionClick = (value) => {
        if (selected !== value) {
            onChange(value);
        }
    };

    return (
        <div>
            <Grid container spacing={6} >
                {countries.map((country) => (
                    <Grid key={country.value} item xs={12} sm={12} md={6} lg={6} sx={{marginTop:'5px'}}>
                        <Card
                            onClick={() => handleOptionClick(country.value)}
                            sx={{
                                cursor: 'pointer',
                                border: `2px solid ${selected === country.value ? 'blue' : 'transparent'}`,
                            }}
                        >
                            <CardContent>
                                <Box sx={{display:'flex', alignItems:'center'}}>
                                <img
                                    src={country.flagSrc}
                                    alt={`${country.label} Flag`}
                                    style={{
                                        height: '100%',
                                        width: '40px',
                                        marginRight: '5px',
                                    }}
                                    />
                                    {/* <CalendarMonthIcon sx={{fontSize:'2rem', color:'blue', ml:2}} /> */}
                                    </Box>
                                <Typography variant="h6">{country.label}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
