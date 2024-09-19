import React, {useEffect, useState} from 'react';
import Navbar from '../Partials/Navbar';
import { web } from "@/Pages/Web/Styles/Styles";
import Footer from "@/Pages/Web/Partials/Footer";
import {Container, Typography, TextField, Button, Box, AppBar, Toolbar} from '@mui/material';
import Progress from "@/Pages/Web/Progress";
import {Link} from "@inertiajs/react";
import {ArrowBack} from "@mui/icons-material";

const mapSection = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    height: '80vh'
  },
  h4: {
    color: web.textBlue,
  },
};

export default function TrackParcel() {
  const [orderId, setOrderId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`order-track/${orderId}`);
      setErr(false)
      if (response.data.message === 'Order Detail') {
        setLoading(false)
        setSearchResult(response.data.payload.orderDetail);
        setOrderId('')
      } else {
        setLoading(false)
        setSearchResult(null);
      }
    } catch (error) {
      setErr(true)
      setLoading(false)
      setSearchResult(null);
    }
  };
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
  return (
    <div style={{ background: web.bgGray }}>
        {isLoading ? (
            <Progress/>
        ) : (
            <>
                <AppBar sx={{position:'static'}}>
                    <Toolbar>
                        <img  src="img/logo2.png" style={{height:'50px'}}/>
                        <Link href={route("home")} style={{marginLeft:'auto'}}>
                            <Button
                                variant='contained'
                                sx={{
                                    background:'#FCBC0E',
                                    color:'#000',
                                    '&:hover' : {
                                        background:'#000',
                                        color:'#FCBC0E'
                                    }
                                }}
                                startIcon={
                                    <ArrowBack />
                                }

                            >Back to home </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
      <Container sx={mapSection.container}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={mapSection.h4}>
        Urmărește Coletul
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Simplu introduceți codul care îl puteți găsi in email-ul vostru sau când ați pus comand
        </Typography>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button
          variant={loading ?  'disbaled' : "contained"}
          onClick={handleSearch}
          style={{ marginTop: '1rem',backgroundColor: web.bgBlue}}
        >
          {
            loading ? 'Please Wait' : 'Search'
          }
        </Button>

        {searchResult !== null ? (
          <Box sx={{
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginTop: '1rem',
              background:'#0051A8',
              color:'#fff'
          }}>
              <Typography variant="h6">Detaliile Comenzii</Typography>
              <Typography variant="body1">
                <strong>ID-ul Comenzii:</strong> {searchResult.id}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {searchResult.status}
              </Typography>
              <Typography variant="body1">
                <strong>Destinația Comenzii:</strong> {searchResult.order_destination}
              </Typography>
              <Typography variant="body1">
                <strong>Preț:</strong> £ {searchResult.price}
              </Typography>
              <Typography variant="body1">
                <strong>Serviciu: </strong> {searchResult.service == 'CTC' ?
                'Punct de colectare la punct de colectare' :
                searchResult.service == 'CTD' ?
                'Punct de colectare la ușă' :
                searchResult.service == 'DTD' ?
                'Din ușă în ușă' :
                'Ușa către punctul de colectare'


              }
              </Typography>
          </Box>
        ) : (
          <Typography style={{ marginTop: '1rem', color:'red' }} variant="body1">
            {
              err ?
              <>
              <strong>Message:</strong> Ne pare rău, ID-ul comenzii nu exista sau a fost introdus greșit. Va rugam sa încercați din nou. 
              </>
              : ""
            }
          </Typography>
        )}
      </Container>
      <Footer />
            </>
        )}
    </div>
  );
}
