import React, {useEffect, useState} from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import {web} from '@/Pages/Web/Styles/Styles';
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';
import UkSection from "@/Pages/Web/CollectionPoint/UkSection/UkSection";
import MoldovaSection from "@/Pages/Web/CollectionPoint/MoldovaSection/MoldovaSection";
import {Head, Link} from "@inertiajs/react";
import Progress from "@/Pages/Web/Progress";
import { ArrowBack } from '@mui/icons-material';

const tableContainerStyle = {
    backgroundColor: web.bgGray,
    marginTop: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ddd',
    backgroundColor: '#f2f2f2',
};

const headerCellStyle = {
    ...tableCellStyle,
    backgroundColor: '#333',
    color: '#fff',
};

const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const mapSection = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        // height: '75vh',
    },
    h4: {
        color: web.textBlue,
    },
};




export default function CollectionPoint({
                                            ukCollectionPoint,
                                            moldovaCollectionPoint,
                                            // CollectionPoints
                                        }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    return (
        <div style={{backgroundColor: web.bgGray}}>
            {/*<Head title="Home"/>*/}
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
                        {/*<Typography variant="h4" fontWeight="bold" gutterBottom sx={mapSection.h4}>*/}
                        {/*  Collection Points*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="subtitle1" gutterBottom>*/}
                        {/*  Here are all collection points of UK and Moldova*/}
                        {/*</Typography>*/}

                        {/*<Table style={tableContainerStyle}>*/}
                        {/*  <TableHead>*/}
                        {/*    <TableRow>*/}
                        {/*      <TableCell style={headerCellStyle}>*/}
                        {/*        <b>UK Collection Point</b>*/}
                        {/*      </TableCell>*/}
                        {/*      <TableCell style={headerCellStyle}>*/}
                        {/*        <b>Moldova Collection Point</b>*/}
                        {/*      </TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*  </TableHead>*/}
                        {/*  <TableBody>*/}
                        {/*    <TableRow>*/}
                        {/*      <TableCell style={tableCellStyle}>*/}
                        {/*        <List>*/}
                        {/*          {ukCollectionPoint.map((item) => (*/}
                        {/*            <ListItem style={{ textAlign: 'center' }} key={item.id}>*/}
                        {/*              <ListItemText primary={item.name} />*/}
                        {/*            </ListItem>*/}
                        {/*          ))}*/}
                        {/*        </List>*/}
                        {/*      </TableCell>*/}
                        {/*      <TableCell style={tableCellStyle}>*/}
                        {/*        <List>*/}
                        {/*          {modlovaCollectionPoint.map((item) => (*/}
                        {/*            <ListItem style={{ textAlign: 'center' }} key={item.id}>*/}
                        {/*              <ListItemText primary={item.name} />*/}
                        {/*            </ListItem>*/}
                        {/*          ))}*/}
                        {/*        </List>*/}
                        {/*      </TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*  </TableBody>*/}
                        {/*</Table>*/}
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={mapSection.h4}>
                            Punctele Noastre De Colectare Din Anglia
                        </Typography>
                         <Typography variant="subtitle1" gutterBottom>
                             Aici ne puteti vedea punctele de colectare din Anglia:
                         </Typography>
                        <UkSection
                            CollectionPoints={ukCollectionPoint}
                        />
                         <Typography variant="h4" fontWeight="bold" gutterBottom sx={mapSection.h4}>
                         Punctele noastre de colectare în Moldova
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Aici ne puteti vedea punctele de colectare din Moldova:
                        </Typography>
                        <MoldovaSection
                            CollectionPoints={moldovaCollectionPoint}
                        />
                    </Container>
                    <Footer/>
                </>
            )}
        </div>
    );
}
