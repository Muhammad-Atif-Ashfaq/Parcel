import React, {useState} from 'react';
import {Button, Container, Grid, TextField, Typography, useTheme} from '@mui/material';
import {web} from "@/Pages/Web/Styles/Styles";
import {useForm} from "@inertiajs/react";

const faq = {
    container: {
        textAlign: 'center',
        padding: '2rem',
    },
    h4: {
        color: web.textBlue,
        mt: '15px'
    },
    contactText: {
        // textAlign: 'left',
        // padding: '1rem'
    },
    contactForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem'
    }
}

function Contact({contactSectionRef}) {

      const {data, setData, post, put,reset, delete: destroy, errors, processing, recentlySuccessful} = useForm({
        name: '',
        email: '',
        phone: '',
        message:''
    });
      const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // You can access the form data in the formData object
        console.log('Form Data:', data);
        post(route('contact'));
        data.name = '';
        data.email = '';
        data.phone = '';
        data.message = '';

      };
    const theme = useTheme()
    return (
        <>
            <div ref={contactSectionRef}>
                <Container sx={faq.container}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={faq.h4}>
                        Contacte
                    </Typography>

                <Grid container>
                    <Grid item xs={12}
                    sx={{
                        padding:'1rem',
                        [theme.breakpoints.down('md')]: {
                            padding:'0.5rem'
                        }

                    }}
                    >
                        <br/>
                        <Typography>
                            Dacă aveți întrebări sau nelămuriri legate de comanda dumneavoastră, nu ezitați să ne
                            contactați : hello@veloceplus.com.
                        </Typography>
                        <br/>
                        <Typography>
                            Apreciem încrederea acordată serviciilor noastre. Echipa Veloce Plus face tot posibilul
                            pentru a vă oferi o experiență de expediere rapidă și eficientă. Așteptăm cu nerăbdare să vă
                            servim!
                        </Typography>
                    </Grid>
                    <form style={{width: '100%'}} onSubmit={handleSubmit} >
                        <Grid  item xs={12} sx={faq.contactForm} >
                            <TextField
                             label="Nume"

                             variant="outlined"
                             value={data.name}
                             onChange={(e) => setData('name', e.target.value)}
                            />
                            <TextField
                             label="Email"

                             variant="outlined"
                             value={data.email}
                             onChange={(e) => setData('email', e.target.value)}
                            />
                            <TextField
                             label="Număr de Telefon"

                             variant="outlined"
                             value={data.phone}
                             onChange={(e) => setData('phone', e.target.value)}
                            />
                            <TextField
                             label="Mesaj"

                             variant="outlined"
                             value={data.message}
                             onChange={(e) => setData('message', e.target.value)}
                            />
                            <Button type="submit" variant="contained" sx={{ background: web.bgBlue }}>
                            Trimiteți Mesajul
                            </Button>
                        </Grid>
                    </form>
                </Grid>
                </Container>

            </div>
        </>
    );
}

export default Contact;
