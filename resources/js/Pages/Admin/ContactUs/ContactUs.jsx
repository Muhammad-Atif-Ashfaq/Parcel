import React from 'react';
import {Box, useTheme} from '@mui/material';
import Topbar from "../Partials/Topbar";
import Sidebar from "../Partials/Sidebar";
import Maincontent from "../ContactUs/Main";
import {admin, topBarStyles} from "@/Pages/Admin/Styles/Styles";
import {Head} from "@inertiajs/react";

export default function ContactUs({auth, contactUs}) {
    const theme = useTheme()
    const sidebarStyles = {
        backgroundColor: admin.bgBlue,
        color: '#fff',
        width: '250px',
        zIndex: 50,
        position: 'fixed',
        top: '60px',
        bottom: 0,
        left: 0,
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    };
    const contentStyles = {
        marginLeft: '250px', // Adjust as needed
        marginTop: '80px', // Adjust as needed
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            marginLeft: '0px',
        }
    };
    return (
        <div>
            <Head title="ContactUs"/>
            <Box sx={topBarStyles}>
                <Topbar
                    user={auth.user}
                    pageName='Contact Us'
                />
            </Box>
            <Box sx={sidebarStyles}>
                <Sidebar
                    user={auth.user}
                />
            </Box>
            <Box sx={contentStyles}>
                <Maincontent
                    contactUs={contactUs}
                    user={auth.user}
                />
            </Box>
        </div>
    );
}
