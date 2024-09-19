import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import {web} from "@/Pages/Web/Styles/Styles";


export default function MapComponent({ points, selectedPoint, userLocation }) {
    const [selectedMarker, setSelectedMarker] = useState(null);

    const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = userLocation ? userLocation : selectedPoint ? { lat: parseFloat(selectedPoint.latitude), lng: parseFloat(selectedPoint.longitude) } : { lat: 51.209000, lng: -2.647000 };
  const zoom = userLocation ? 15 : selectedPoint ? 15 : 5;

  const [distance, setDistance] = useState(null);
  const [polylinePath, setPolylinePath] = useState([]);


  // Calculate the distance between two sets of coordinates
  const calculateDistance = (coord1, coord2) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    const lat1 = coord1.lat;
    const lng1 = coord1.lng;
    const lat2 = coord2.lat;
    const lng2 = coord2.lng;

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  };

    const getCustomMarkerIcon = (color) => {
        return {
            url: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
        };
    };


    useEffect(() => {
    if (userLocation && selectedPoint) {
      const userCoord = userLocation;
      const pointCoord = {
        lat: parseFloat(selectedPoint.latitude),
        lng: parseFloat(selectedPoint.longitude),
      };
      const distanceBetweenMarkers = calculateDistance(userCoord, pointCoord);
      setDistance(distanceBetweenMarkers);
      setPolylinePath([userCoord, pointCoord]);
    }
  }, [userLocation, selectedPoint]);

  return (
    <Paper elevation={3}>
      <LoadScript googleMapsApiKey="AIzaSyCnQJgCNCPgLiVoow1bXx1h7NI3qQ73Gb0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
          {points.map((point) => (
            <Marker
              key={point.id}
              position={{ lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) }}
              title={point.name}
              icon={getCustomMarkerIcon('blue')}
              onClick={() => setSelectedMarker(point)}
            />
          ))}
            {selectedMarker && ( // Conditionally render the info window
                <InfoWindow
                    position={{ lat: parseFloat(selectedMarker.latitude), lng: parseFloat(selectedMarker.longitude) }}
                    onCloseClick={() => setSelectedMarker(null)} // Close the info window
                >
                    <div>
                        <h1 style={{
                            color:web.textBlue
                        }}><b>{selectedMarker.name}</b></h1>
                        <p>{selectedMarker.address}</p>
                        <p>Ultima Zi și Oră de Colectare: {selectedMarker.last_collection_day} {selectedMarker.last_collection_time}</p>
                    </div>
                </InfoWindow>
            )}
          {userLocation && ( // Conditionally render user's selected location marker
            <Marker
              position={userLocation}
              title={userLocation.name}
              icon={getCustomMarkerIcon('blue')}
            //   icon={{
            //     url: publicURL + '/image/icon.png', // Use the public URL to access the image
            //     scaledSize: new window.google.maps.Size(30, 30),
            //   }}
            />
          )}
          {distance && polylinePath.length === 2 && (
            <Polyline
              path={polylinePath}
              options={{
                strokeColor: '#FF0000', // Line color (red)
                strokeOpacity: 1, // Line opacity (fully opaque)
                strokeWeight: 3, // Line thickness
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      {distance && (
        <div>
          <p>Distance between markers: {distance.toFixed(2)} km</p>
        </div>
      )}
    </Paper>
  );
}
