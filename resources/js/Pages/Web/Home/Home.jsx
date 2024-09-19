import React, {useEffect, useState, useRef} from 'react';
import Navbar from '../Partials/Navbar';
import BannerSection from "@/Pages/Web/Home/BannerSection/BannerSection";
import ServicesSection from "@/Pages/Web/Home/ServicesSection/ServicesSection";
import MapSection from "@/Pages/Web/Home/MapSection/MapSection";
import Faq from "@/Pages/Web/Home/FAQ/Faq";
import {web} from "@/Pages/Web/Styles/Styles";
import Footer from "@/Pages/Web/Partials/Footer";
import {Head} from "@inertiajs/react";
import Progress from "@/Pages/Web/Progress";
import Swal from 'sweetalert2';
import '../OrderStepper/Steps/OrderForm/styles.css';
import About from "@/Pages/Web/Home/About/About";
import Contact from "@/Pages/Web/Home/Contact/Contact";

export default function Home({CollectionPoints, email_error}) {
    const servicesSectionRef = useRef(null);
    const contactSectionRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const questionSectionRef = useRef(null);
    const mapSectionRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(email_error);


    const handleOpenModal = (email_error) => {
        Swal.fire({
            title: "Email Error",
            text: ` ${email_error}.`,
            icon: 'error',
            customClass: {
                container: 'my-swal',
            },
        });

    };



    useEffect(() => {
        if(email_error)
        {
            handleOpenModal(email_error);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [email_error]);
    return (
        <div style={{background: web.bgGray}}>
            {/*<Head title="Home"/>*/}
            {isLoading ? (
                <Progress/>
            ) : (
                <>
                    <Navbar servicesSectionRef={servicesSectionRef} contactSectionRef={contactSectionRef} aboutSectionRef={aboutSectionRef} questionSectionRef={questionSectionRef} mapSectionRef={mapSectionRef} />
                    <BannerSection mapSectionRef={mapSectionRef}/>
                    <ServicesSection servicesSectionRef={servicesSectionRef} />
                    <MapSection
                        CollectionPoints={CollectionPoints}
                    />
                    <Faq questionSectionRef={questionSectionRef} />
                    <About aboutSectionRef={aboutSectionRef}/>
                    <Contact contactSectionRef={contactSectionRef}/>
                    <Footer servicesSectionRef={servicesSectionRef} contactSectionRef={contactSectionRef} aboutSectionRef={aboutSectionRef} questionSectionRef={questionSectionRef} mapSectionRef={mapSectionRef}/>
                </>
            )}

        </div>
    );
}


