import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Box from '@mui/material/Box';
import {web} from "@/Pages/Web/Styles/Styles";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        // Show the button when the user scrolls down a certain distance
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Replace 'your-whatsapp-number' with your actual WhatsApp number.
    const whatsappNumber = '+37368249444';

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {isVisible && (
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    position="fixed"
                    bottom="20px"
                    right="20px"
                    opacity={isVisible ? 1 : 0}
                    transition="opacity 0.3s"
                    zIndex={1000}
                    onClick={handleWhatsAppClick}
                >
                    <Box >
                    <Fab variant="extended" sx={{bottom:'5px', right:'10px', background: web.bgBlue, color:'#fff'
                        ,'&:hover': {
                            backgroundColor: '#ffbd01',
                        }}}>
                        <ChatBubbleIcon sx={{ mr: 1 }} />
                        Chat
                    </Fab>
                    </Box>
                    <Fab
                        color="primary"
                        size="medium"
                        onClick={scrollToTop}
                        sx={{ width: '30px', height: '25px', borderRadius: '10px' }}
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            )}
        </>
    );
};

export default ScrollToTopButton;
