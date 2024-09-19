import React from 'react';
import ServicesSection from "@/Pages/Web/SendParcel/ServicesSection/ServicesSection";
import Navbar from "@/Pages/Web/Partials/Navbar";
import Footer from "@/Pages/Web/Partials/Footer";
import {Head} from "@inertiajs/react";

export default function SendParcel() {

    return (
        <>
            <Head title="Send Parcel"/>
            <Navbar/>
            <ServicesSection/>
            <Footer/>
        </>
    );
}
