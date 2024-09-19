import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {Head} from '@inertiajs/react';
import {Box, useTheme} from "@mui/material";
import {admin, topBarStyles} from "@/Pages/Admin/Styles/Styles";
import Topbar from "@/Pages/Admin/Partials/Topbar";
import Sidebar from "@/Pages/Admin/Partials/Sidebar";
import React from "react";

export default function Edit({auth, mustVerifyEmail, status}) {
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
            <Head title="Profile"/>
            <Box sx={topBarStyles}>
                <Topbar
                    user={auth.user}
                    pageName='Profile'
                />
            </Box>
            <Box sx={sidebarStyles}>
                <Sidebar
                    user={auth.user}
                />
            </Box>
            <Box sx={contentStyles}>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl"/>
                        </div>

                        {/*<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">*/}
                        {/*    <DeleteUserForm className="max-w-xl" />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Box>
        </div>
    )
}
