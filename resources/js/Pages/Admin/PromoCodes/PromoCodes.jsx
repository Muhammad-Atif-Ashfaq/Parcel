import React from 'react';
import {Box, useTheme} from '@mui/material';
import Topbar from "../Partials/Topbar";
import Sidebar from "../Partials/Sidebar";
import Maincontent from "../PromoCodes/Maincontent";
import {admin, topBarStyles} from "@/Pages/Admin/Styles/Styles";
import {Head} from "@inertiajs/react";

export default function PromoCodes({auth, promoCode}) {
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
            <Head title="PromoCodes"/>
            <Box sx={topBarStyles}>
                <Topbar
                    user={auth.user}
                    pageName='Promo Codes'
                />
            </Box>
            <Box sx={sidebarStyles}>
                <Sidebar
                    user={auth.user}
                />
            </Box>
            <Box sx={contentStyles}>
                <Maincontent
                    promoCode={promoCode}
                    user={auth.user}
                />
            </Box>
        </div>
    );
}
