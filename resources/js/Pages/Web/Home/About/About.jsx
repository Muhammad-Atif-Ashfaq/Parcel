import React from 'react';
import {Container, Divider ,Typography} from '@mui/material';
import {web} from "@/Pages/Web/Styles/Styles"; // Ensure you import the correct icon for the expand/collapse functionality


const faq = {
    container: {
        textAlign: 'center',
        padding: '2rem',

    },
    background: {
        backgroundColor: web.bgGrayDark
    },
    h4: {
        color: web.textBlue,
        mt:'15px'
    }
}

function About({aboutSectionRef}) {


    return (
        <>
            <div ref={aboutSectionRef} style={faq.background}>

                <Container sx={faq.container}>

                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={faq.h4}>
                        Despre Noi
                    </Typography>

                    <Typography>
                        Când pandemia de Covid-19 a lovit, lumea a simțit un cutremur neașteptat, ca și cum totul s-a oprit brusc în loc. Am văzut afaceri care s-au prăbușit și altele care au înflorit în acea vreme tumultuoasă. Cu toate acestea, o revelație a devenit clară pentru noi: modelul tradițional de expediere a coletelor e învechit, lent și plin de complicații. A fost ca și cum am fi fost forțați să trăim în trecut, în vremuri când așteptarea și neconfortul erau norma.
                    </Typography>
                    <Typography>
                        Așa că ne-am propus să schimbăm jocul. Am decis să reinventăm modul în care Moldovenii trimit și primesc colete, dând naștere la Veloce Plus. În loc să aderăm la metodele vechi și învechite, am adus o inovație revoluționară: puncte de colectare deschise 16 ore pe zi, 7 zile pe săptămână, atât în Anglia cât și în Moldova. Și nu doar atât, suntem singurii care oferim livrare în orice colț, oricât de izolat, fie că e un sat retras din Republica Moldova sau un oraș aglomerat din Anglia. Și da, până la poarta dumneavoastră.
                    </Typography>
                    <Typography>
                        Ne-am concentrat să construim o rețea vastă cu peste 50 de puncte de colectare și am adunat o echipă dedicată de peste 40 de șoferi. Totul pentru a vă oferi o experiență de expediere fără precedent, eficientă și rapidă. Într-o lume în care toată lumea se aștepta la mai puțin, Veloce Plus promite mai mult. Pentru că meritați mai bine decât standardul vechi și învechit.
                    </Typography>
                </Container>
            </div>
        </>
    );
}

export default About;
