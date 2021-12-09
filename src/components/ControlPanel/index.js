import React, { useContext, useEffect } from 'react';
import { CaseContext } from '../../context/CaseContext';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import CountyDashboard from './Dashboards/CountyDashboard';
import CountryDashboard from './Dashboards/CountryDashboard';
import './style.css';

export default function CustomDrawer () {
    const { panelOpen, setPanelOpen, selectedCounty, setSelectedCounty } = useContext(CaseContext);

    useEffect(() => {
        if (!panelOpen) {
            setSelectedCounty(null);
        }
    }, [panelOpen])

    const handleOnOpen = () => {
        if (!panelOpen) {
            setPanelOpen(true)
        } else {
            setPanelOpen(false)
        }
    }

    const handleOnClose = () => {
        setPanelOpen(false)
        if (selectedCounty) {
            setSelectedCounty(null)
        }
    }

    const removeCounty = () => {
        setSelectedCounty(null);
    }

    return (
        <div>
            <Drawer anchor="right" open={panelOpen} onClose={handleOnOpen} BackdropProps={{ invisible: true }} variant="persistent">
                <div style={{ textAlign: 'center', width: '46vh', padding: '8px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {
                            selectedCounty ? (
                                <h2>
                                    <Chip label={selectedCounty} onDelete={removeCounty} />
                                </h2>
                            ) : (
                                <h2>Ireland</h2>
                            )
                       }
                        <div style={{ margin: 'auto', marginRight: '-8px' }}>
                            <Button style={{ color: 'black' }} onClick={handleOnClose}>
                                <CloseIcon style={{ fontSize: '38px', padding: '0px' }}/>
                            </Button>
                        </div>
                    </div>
                    {
                      selectedCounty ? (
                        <div>
                            <CountyDashboard />
                        </div>
                        ) : (
                            <CountryDashboard />
                        )
                    }
                </div>
            </Drawer>
        </div>
    )
}