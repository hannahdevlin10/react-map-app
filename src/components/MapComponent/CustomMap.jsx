import React, { useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../../data/ireland.json';
import 'leaflet/dist/leaflet.css';
import { useContext } from 'react';
import { CaseContext } from '../../context/CaseContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function CustomMap () {
    const {cases, selectedCounty, setSelectedCounty, panelOpen, setPanelOpen} = useContext(CaseContext);
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        setCoords(cases?.find((item) => item?.attributes?.CountyName === selectedCounty)?.geometry);
    }, [selectedCounty]);

    const handleOnClick = () => {
        if (!panelOpen) {
            setPanelOpen(true)
        } else {
            setPanelOpen(false)
        }
    }

    const countryStyle = {
        fillColor: '#01A66F',
        fillOpacity: 1,
        color: '#75CE9F',
        weight: 1.75
    }
    
    const onEachCounty = (county, layer) => {
        const countyName = county.properties.name;

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
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '95%' }}>
                    <h1 style={{ marginRight: '-58px' }}>Ireland Covid Data</h1>
                </div>
                <div style={{ margin: 'auto' }}>
                    <Button style={{ color: 'black' }} onClick={handleOnClick} disabled={!selectedCounty}>
                        <MenuIcon style={{ fontSize: '38px', padding: '0px' }}/>
                    </Button>
                </div>
            </div>
            <MapContainer style={{ height: '80vh' }} zoom={7} center={[ 53.5, -8 ]}>
                <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCounty} />
            </MapContainer>
        </div>
    )
}