import React from 'react';
import {web} from "@/Pages/Web/Styles/Styles";
import Navbar from "@/Pages/Web/Partials/Navbar";
import Footer from "@/Pages/Web/Partials/Footer";
import {Container, Typography} from "@mui/material";
import OrderForm from "@/Pages/Web/CreateOrder/OrderForm/OrderForm";
import {Head} from "@inertiajs/react";

export default function CreateOrder({auth, service, to}) {

    return (
        <>
            <Head title="Create order"/>
            <Navbar/>
            <div style={{backgroundColor: web.bgGray}}>
                <Container sx={{
                    textAlign: 'center',
                    padding: '2rem',
                }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{color: web.textBlue}}>
                        Order Form
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Form for order submit
                    </Typography>
                    <OrderForm
                        user={auth.user}
                        service={service}
                        to={to}
                    />
                </Container>
            </div>
            <Footer/>
        </>
    );
}
