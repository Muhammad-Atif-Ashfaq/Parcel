import React from 'react';
import {Box, useTheme} from '@mui/material';
import Topbar from "../Partials/Topbar";
import Sidebar from "../Partials/Sidebar";
import Maincontent from "../CollectionPoints/Maincontent";
import {admin, topBarStyles} from "@/Pages/Admin/Styles/Styles";
import {Head} from "@inertiajs/react";

export default function CollectionPoints({auth, collectionPoint}) {
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
            <Head title="Collection Points"/>
            <Box sx={topBarStyles}>
                <Topbar
                    user={auth.user}
                    pageName='Collection Points'
                />
            </Box>
            <Box sx={sidebarStyles}>
                <Sidebar
                    user={auth.user}
                />
            </Box>
            <Box sx={contentStyles}>
                <Maincontent
                    collectionPoint={collectionPoint}
                />
            </Box>
        </div>
    );
}
