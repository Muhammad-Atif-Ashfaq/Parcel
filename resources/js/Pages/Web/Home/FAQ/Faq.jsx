import React from 'react';
import { Container, Typography, Divider , Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {web} from "@/Pages/Web/Styles/Styles"; // Ensure you import the correct icon for the expand/collapse functionality

const faqs = [
    {
        question: "Ce se întâmplă dacă nu sunt disponibil când vine șoferul pentru colet?",
        answer: "Dacă nu sunteți prezent în momentul sosirii șoferului, acesta va încerca să vă contacteze telefonic. Dacă nu poate stabili un contact, se va programa o nouă încercare de colectare sau vă va lăsa o notificare cu instrucțiuni suplimentare. Alternativ, vom lăsa coletul la cel mai apropiat punct de colectare al destinatarului."
    },
    {
        question: "Unde găsesc punctul de colectare cel mai apropiat?",
        answer: "Puteți localiza cel mai apropiat punct de colectare folosind funcția de căutare de pe platforma noastră. Introduceți adresa dumneavoastră și veți vedea o listă a punctelor de colectare din apropiere. Când sunteți gata să faceți o comandă, apăsați butonul 'trimite colet' și urmăriți pașii următori."
    },
    {
        question: "Există o limită de greutate sau dimensiune pentru colete?",
        answer: "Nu avem limită, dar pentru colete mai grele de 150 kg, vă rugăm să ne contactați."
    },
    {
        question: "Cum pot urmări progresul coletului meu?",
        answer: "După expediere, veți primi un cod de urmărire pe care îl puteți folosi pe site-ul nostru pentru a vedea stadiul actual și locația coletului dumneavoastră."
    },
    {
        question: "Ce fac dacă coletul meu este deteriorat sau nu ajunge la destinație?",
        answer: "În cazul în care coletul este deteriorat sau pierdut, vă rugăm să contactați serviciul nostru de asistență imediat. Vom investiga situația și vă vom oferi soluții adecvate."
    },
    {
        question: "Cum modific detaliile de livrare după ce am plasat comanda?",
        answer: "Dacă doriți să modificați detaliile de livrare, vă rugăm să creați o comandă nouă dacă ați folosit serviciul Punct de Colectare la Punct de Colectare. Dacă ați ales un serviciu Door, așteptați să fiți contactat. Alternativ, dați-ne un semn și vom fi mai mult decât disponibili să vă ajutăm!"
    },
    {
        question: "Se pot adăuga costuri suplimentare la comanda mea?",
        answer: "Toate tarifele și costurile sunt comunicate clar în momentul plasării comenzii. Orice costuri suplimentare, dacă sunt necesare, vor fi comunicate și confirmate cu dumneavoastră înainte de aplicare. Costul final este făcut la ridicarea coletului de către șofer sau punct de colectare, după confirmarea kilogramelor coletului."
    },
    {
        question: "Cât durează până când coletul ajunge la destinație?",
        answer: "Timpul de livrare variază în funcție de momentul când coletul este lăsat la Punctul de Colectare sau preluat de șofer. În medie, durează 3 zile."
    },
    {
        question: "Pot să trimit colete fragile sau cu conținut special?",
        answer: "Da, puteți trimite colete cu conținut special sau fragil, însă vă recomandăm să specificați acest lucru la momentul expedierii și să asigurați ambalarea adecvată pentru protecția conținutului."
    },
    {
        question: "Cum asigurați securitatea coletelor în timpul transportului?",
        answer: "Toate coletele sunt manipulate cu mare atenție și sunt monitorizate de-a lungul întregului traseu. Folosim măsuri de siguranță, inclusiv supraveghere video, pentru a asigura integritatea coletelor."
    },
    {
        question: "Cum pot lua legătura cu echipa de asistență dacă am întrebări sau probleme?",
        answer: "Dacă aveți întrebări sau probleme, ne puteți contacta prin telefon, e-mail sau prin formularul de contact disponibil pe site-ul nostru. Echipa noastră este gata să vă asiste și să vă ofere suportul necesar."
    }
    // Add other FAQ objects in the same format if needed
];

const faq = {
    container: {
        // textAlign: 'center',
        padding: '2rem',

    },
    h4: {
        color: web.textBlue,
        mt:'20px'
    }
}
function Faq( {questionSectionRef} ) {


    return (
        <>
            <div ref={questionSectionRef} style={{mt:'20px'}}>

                <Container sx={faq.container}>
                    <Divider sx={{background: web.textBlue }}/>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={faq.h4}>
                        Intrebari Frecvente
                    </Typography>

                    {faqs.map((faq, index) => (
                        <Accordion key={index} sx={{background: web.bgGrayDark }}>
                            <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </div>
        </>
    );
}

export default Faq;
