import React, {useState} from "react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {web} from "@/Pages/Web/Styles/Styles";
import NearCollectionPoint
    from "@/Pages/Web/CreateOrder/OrderForm/PlacesSearch/NearCollectionPoint/NearCollectionPoint";


export default function PlacesSearch({id, address, errors, onChange, onCLickLi}) {
    const [receiverPlaces, setReceiverPlaces] = useState([]);
    const [nearCollectionPoint, setNearCollectionPoint] = useState('');

    const handleSearch = async (value) => {
        onChange(value)
        if (value == '') {
            setReceiverPlaces([]);
            return false;
        }
        const endpoint = route('place.search', value)
        try {
            const response = await axios.get(endpoint);
            setReceiverPlaces(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };
    const handleNearCollection = async (address, latitude, longitude) => {
        const endpoint = route('getNearCollection', [latitude, longitude])
        try {
            const response = await axios.get(endpoint);
            setNearCollectionPoint(response.data)
            onCLickLi({address: address, collection_id: response.data.id})
            setReceiverPlaces([]);
        } catch (error) {
            console.error(error);
            setReceiverPlaces([]);
        }
    };


    return (
        <>
            <div>
                <InputLabel htmlFor={id} value="Address"/>
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
                    width: '40%',
                    backgroundColor: web.bgGray
                }}>
                    {receiverPlaces.map((place, index) => (
                        <li style={{padding: '5px', borderBottom: '1px solid gray'}}
                            key={index}
                            onClick={(e) => handleNearCollection(place.name, place.geometry.location.lat, place.geometry.location.lng)}
                        >{place.name}</li>
                    ))}
                </ul>
                <InputError className="mt-2" message={errors.receiver_address}/>
            </div>
            <div>
                {nearCollectionPoint && (
                    <NearCollectionPoint name={nearCollectionPoint.name} address={nearCollectionPoint.address}
                                         distance={nearCollectionPoint.distance}/>
                )}

            </div>
        </>
    )
}
