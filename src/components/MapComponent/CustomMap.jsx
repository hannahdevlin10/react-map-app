import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../../data/ireland.json';
import 'leaflet/dist/leaflet.css';

export default function CustomMap () {
    const [selectedCounty, setSelectedCounty] = useState(null);

    useEffect(() => {
        console.log(mapData)
    }, [])

    useEffect(() => {
        // console.log('selected county: ', selectedCounty)
    }, [selectedCounty])

    const countryStyle = {
        fillColor: '#01A66F',
        fillOpacity: 1,
        color: '#75CE9F',
        weight: 1.75
    }
    
    const onEachCounty = (county, layer) => {
        const countyName = county.properties.name;
        layer.bindPopup(countyName)
        
        layer.getPopup().on('remove', function() {
            setSelectedCounty(null)
        })

        layer.on({
            click: (event) => {
                setSelectedCounty(event.target.feature.properties.name)
                setTimeout(function (){
                    if (event.target.feature.properties.name === countyName) {
                        event.target.setStyle ({
                            fillColor: '#FFC06E',
                            weight: 2.25
                        })
                    } else {
                        event.target.setStyle ({
                            fillColor: '#01A66F'
                        })
                    }
                }, 150)
            }
        })
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Ireland Covid Data</h1>
            <MapContainer style={{ height: '80vh' }} zoom={7} center={[ 53.5, -8 ]}>
                <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCounty} />
            </MapContainer>
        </div>
    )
}