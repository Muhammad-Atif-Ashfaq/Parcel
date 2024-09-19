import React from 'react';
import Typography from '@mui/material/Typography';

export default function TruncateText({ text, limit ,...props }) {
    if (text && text.split(' ').length > limit) {
        const words = text.split(' ');
        return (
            <Typography {...props} color="textSecondary">
                {words.slice(0, limit).join(' ')}...
            </Typography>
        );
    }

    return (
        <Typography {...props} color="textSecondary">
            {text}
        </Typography>
    );
}

