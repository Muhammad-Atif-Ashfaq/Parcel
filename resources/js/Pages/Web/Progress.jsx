import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function Progress ()  {
    const loaderContainer = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }

    return (
        <div style={loaderContainer}>
            <CircularProgress />
        </div>
    );
};
