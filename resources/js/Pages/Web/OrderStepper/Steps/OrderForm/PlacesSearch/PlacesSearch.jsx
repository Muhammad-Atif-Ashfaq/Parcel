import React, {useState, useEffect} from "react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {web} from "@/Pages/Web/Styles/Styles";
import NearCollectionPoint
    from "./NearCollectionPoint/NearCollectionPoint";
import {Typography, useTheme, Card, CircularProgress, CardMedia,CardContent, Button } from "@mui/material";
import TruncateText from "@/Components/TruncateText";
import {makeStyles} from "@mui/styles";

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

export default function PlacesSearch({id,service, address, errors, onChange, onCLickLi,dest, sides}) {
    const [receiverPlaces, setReceiverPlaces] = useState([]);
    const [nearCollectionPoint, setNearCollectionPoint] = useState('');
    const theme = useTheme();
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(false);
    const [offSet, setoffSet] = useState(0);
    const [side, setside] = useState(sides);
    const [destinations, setdestinations] = useState(dest);

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
                console.log(response.data.results);
                setIsLoading(false);
                setReceiverPlaces(response.data.results);
            }

        } catch (error) {
            console.error(error);
        }
    };
    const handleSearch = async (value) => {

        onChange(value)
        if((service == 'CTC')
            ||
            (service == 'CTD' && id=='sender_address')
            ||
            (service == 'DTC' && id=='receiver_address')){

            setInputValue(value)
            if (value == '') {
                setReceiverPlaces([]);
                return false;
            }
        }

    };
    const handleNearCollection = async (address, latitude, longitude) => {

        const endpoint = route('getNearCollection', [latitude, longitude,destinations,side])
        try {
            const response = await axios.get(endpoint);
            if(response.data.length != 0){
                setApiResponse(response.data)
                setNearCollectionPoint(response.data[offSet])
            }else {
                setNearCollectionPoint('')
            }
            onCLickLi({address: address, collection_id: response.data[0].id})
            setReceiverPlaces([]);
        } catch (error) {
            console.error(error);
            setReceiverPlaces([]);
        }
    };

   const nexDropOff = () => {
    setoffSet(offSet+1);
    setNearCollectionPoint(apiResponse[offSet])

    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <InputLabel htmlFor={id} value="Adresa"/>
                <TextInput
                    id={id}
                    value={address}
                    className="mt-1 block w-full"
                    onChange={(e) => handleSearch(e.target.value)}
                    autoComplete={id}
                />
                <ul style={{
                            zIndex: 9999,
                            border: 'none',
                            position: 'absolute',
                            width: '79%',
                            backgroundColor: 'transparent',
                            [theme.breakpoints.down('sm')]: {
                                width: '80%',
                            },
                            [theme.breakpoints.down('md')]: {
                                width: '39%',
                            },
                            top: '100%'
                        }}>
                            {isLoading ? (
                                <li
                                    style={{padding: '0px 10px', borderRadius: '10px',  height: '70px',}}
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
                                                onClick={(e) => handleNearCollection(place.formatted_address, place.geometry.location.lat, place.geometry.location.lng)}
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
                <InputError className="mt-2" message={errors.receiver_address}/>
            </div>
            <div>
                {((service == 'CTC')
                    ||
                (service == 'CTD' && id=='sender_address')
                    ||
                (service == 'DTC' && id=='receiver_address')
                ) && (
                    nearCollectionPoint ? (
                        <div>
                        <NearCollectionPoint name={nearCollectionPoint.name} address={nearCollectionPoint.address}
                                             distance={Math.round(nearCollectionPoint.distance)} last_collection_day={nearCollectionPoint.last_collection_day} last_collection_time={nearCollectionPoint.last_collection_time}/>
                        <Button onClick={() => nexDropOff()} sx={{backgroundColor: 'transparent', color:'blue'}}>
                            Nu acest punct de plecare?
                          </Button>
                        </div>
                    ):(
                        <Typography>
                            Nu a fost găsit niciun punct de colectare.
                        </Typography>
                    )
                )}

            </div>
        </>
    )
}
