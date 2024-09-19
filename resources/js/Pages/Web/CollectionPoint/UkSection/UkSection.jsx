import React, {useEffect, useState} from 'react';
import {Box, Container, ListItemText, TextField, Typography, useTheme} from '@mui/material';
import {web} from "@/Pages/Web/Styles/Styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import MapComponent from "@/Pages/Web/CollectionPoint/UkSection/MapComponent/MapComponent";
import axios from "axios";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import TruncateText from "@/Components/TruncateText";
import CircularProgress from "@mui/material/CircularProgress";
import {makeStyles} from "@mui/styles";

const mapSection = {
    container: {
        // textAlign: 'center',
        padding: '2rem',
    },
    h4: {
        color: web.textBlue
    }
};
const useStyles = makeStyles(theme => ({
    list: {
        '&:hover' : {
            background:web.bgBlue,
            "& span" : {
                color:"#fff"
            }
        }
    }
}))

export default function MapSection({CollectionPoints}) {
    const theme = useTheme();
    const classes = useStyles();
    const [filteredPoints, setFilteredPoints] = useState(CollectionPoints);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [receiverPlaces, setReceiverPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null); // Step 1
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const delay = 500;
        let timer;
        if (inputValue) {

            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fetchData();
            }, delay);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [inputValue]);
    const fetchData = async () => {
        setIsLoading(true);
        const endpoint = route('place.search', inputValue);
        try {
            const response = await axios.get(endpoint);
            if (response) {
                setIsLoading(false);
                setReceiverPlaces(response.data.results);
            }

        } catch (error) {
            console.error(error);
        }
    };
    const handleSearch = async (value) => {
        setInputValue(value)
        if (value === '') {
            setReceiverPlaces([]);
            setSelectedPoint(null);
            setUserLocation(null);
            // Reset filteredPoints to the original CollectionPoints
            setFilteredPoints(CollectionPoints);
            return false;
        }

    };

    const handleNearCollections = async (address, latitude, longitude) => {
        const endpoint = route('getNearCollections', [latitude, longitude]);
        try {
            const response = await axios.get(endpoint);
            setFilteredPoints(response.data);
            setReceiverPlaces([]);
            setUserLocation({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
                name: address,
            }); // Step 3
        } catch (error) {
            setReceiverPlaces([]);
        }
    };

    return (
        <>
            <div style={{background: web.bgGray}}>
                <Container sx={mapSection.container}>
                    {/*<Typography variant="h4" fontWeight="bold" gutterBottom sx={mapSection.h4}>*/}
                    {/*    Collection Points*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle1" gutterBottom>*/}
                    {/*    Here are all collection points of  UK*/}
                    {/*</Typography>*/}
                    <Box sx={{
                        width: '100%',
                        border: '1px solid blue',
                        borderRadius: '10px'
                    }}>
                        <TextField
                            placeholder="Search Location"
                            fullWidth
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                        />
                        <ul style={{
                            zIndex: 9999,
                            border: 'none',
                            position: 'absolute',
                            width: '73%',
                            backgroundColor: 'transparent',
                            [theme.breakpoints.down('sm')]: {
                                width: '80%',
                            },
                            [theme.breakpoints.down('md')]: {
                                width: '39%',
                            }
                        }}>
                            {isLoading ? (
                                <li
                                    style={{padding: '0px 10px', borderRadius: '10px'}}
                                >
                                    <Card style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '70px',
                                        marginTop: '5px',
                                        zIndex: 9999,
                                        borderRadius: '10px'
                                    }}>
                                        <CircularProgress/>
                                    </Card>
                                </li>
                            ) : (
                                <>
                                    {receiverPlaces.slice(0, 5).map((place, index) => (
                                        <>
                                            <li
                                                style={{
                                                    padding: '0px 10px',
                                                    borderRadius: '10px',
                                                    borderBottom: '1px solid gray',
                                                }}
                                                key={index}
                                                onClick={(e) => handleNearCollections(place.name, place.geometry.location.lat, place.geometry.location.lng)}
                                            >
                                                <Card sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '0px 10px',
                                                    '&:hover': {
                                                        backgroundColor: 'lightgray',
                                                    },
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt={place.name}
                                                        sx={{
                                                            width: '30px',
                                                            height: '30px',
                                                            borderRadius: '5px',
                                                        }}
                                                        image={place.icon}
                                                    />
                                                    <CardContent sx={{padding: '5px 0px 0px 10px'}}>
                                                        <TruncateText text={place.name} limit={4}
                                                                      sx={{color: 'black'}}/>
                                                        <TruncateText text={place.formatted_address} limit={15}/>
                                                    </CardContent>
                                                </Card>
                                            </li>
                                        </>
                                    ))}
                                </>
                            )}

                        </ul>
                        <Box sx={{
                            display: 'flex',
                            overflow: 'hidden',
                            [theme.breakpoints.down('md')]: {
                                flexDirection: 'column',
                            }
                        }}>
                            <Box sx={{
                                width: '30%',
                                maxHeight: '400px', // Set a maximum height for the list
                                overflowY: 'scroll', // Add a vertical scrollbar when the content overflows
                                [theme.breakpoints.down('md')]: {
                                    width: '100%',
                                }
                            }}>
                                <List sx={{width: '100%', bgcolor: web.bgGray}}>
                                    {(filteredPoints.length === 0) ?
                                        (
                                            <Typography>
                                                No collection point found.
                                            </Typography>
                                        ) : (
                                            filteredPoints.map((point) => (
                                                <>
                                                    <ListItem
                                                        className={classes.list}
                                                        alignItems="flex-start"
                                                        key={point.id}
                                                        onClick={() => setSelectedPoint(point)}
                                                    >
                                                        <ListItemText
                                                            sx={{color: web.bgBlue,
                                                                '&:hover': {
                                                                    color:'white'
                                                                },
                                                            }}
                                                            primary={point.name + '-' + point.sides}
                                                            secondary={
                                                                <Typography
                                                                    sx={{display: 'inline',
                                                                        '&:hover': {
                                                                            color:'white'
                                                                        },
                                                                    }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    {point.address}<br></br>
                                                                    Ultima Zi și Oră de Colectare: {point.last_collection_day} {point.last_collection_time}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider component="li"/>
                                                </>
                                            ))
                                        )
                                    }
                                </List>
                            </Box>
                            <Box sx={{
                                width: '70%',
                                objectFit: 'cover',
                                overflow: 'hidden',
                                [theme.breakpoints.down('md')]: {
                                    width: '100%',
                                }
                            }}>
                                <MapComponent points={filteredPoints} selectedPoint={selectedPoint}
                                              userLocation={userLocation}/>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
}
