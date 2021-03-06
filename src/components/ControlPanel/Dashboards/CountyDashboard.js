import React, { useState, useEffect, useContext } from 'react';
import { Button, Card } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { CaseContext } from '../../../context/CaseContext';

export default function CountyDashboard () {
    const { cases, selectedCounty, casesInc } = useContext(CaseContext);
    const [data, setData] = useState(null);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [incidenceData, setIncidenceData] = useState(null);

    useEffect(() => {
        if (selectedCounty) {
            switch(selectedCounty) {
                case 'North Tipperary' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Tipperary'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'TIPPERARY'));
                    break;
                case 'South Tipperary' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Tipperary'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'TIPPERARY'));
                    break;
                case 'Fingal' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Dublin'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'DUBLIN'));
                    break;
                case 'Dublin City' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Dublin'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'DUBLIN'));
                    break;
                case 'South Dublin' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Dublin'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'DUBLIN'));
                    break;
                case 'Dún Laoghaire-Rathdown' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Dublin'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'DUBLIN'));
                    break;
                case 'Cork City' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Cork'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'CORK'));
                    break;
                case 'Galway City' :
                    setData(cases?.find((item) => item?.attributes?.CountyName === 'Galway'))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === 'GALWAY'));
                    break;
                default:
                    setData(cases?.find((item) => item?.attributes?.CountyName === selectedCounty))
                    setIncidenceData(casesInc?.filter((item) => item?.attributes?.COUNTY === selectedCounty.toUpperCase()))
            }
        }
        
        setShowBreakdown(false);
    }, [selectedCounty])


    const handleBtnClick = () => {
        if (showBreakdown) {
            setShowBreakdown(false);
        } else {
            setShowBreakdown(true);
        }
    }

    const getTotalIncidence = () => {
        if (incidenceData) {
            let result = incidenceData?.map((item) => Number(item?.attributes?.C19_P14_T));
            return result.reduce((a, b) => a + b, 0);
        }
    }

    function capitalizeFirstLetter(string) {
        let x = string?.toLowerCase();
        return x.charAt(0).toUpperCase() + string.toLowerCase().slice(1).replace("lea-", '').replace(/[0-9]/g, '');
    }

    const dateConvert = (epoch) => {
        if (epoch) {
            var unixts = epoch;
            var date = new Date(unixts);
            var fdate = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' +  date.getFullYear();
            return fdate;
        }
    }

    return (
        <div>
            <div style={{ margin: '5px 0px' }}>
                {data?.attributes?.ConfirmedCovidCases && 
                  <Card variant="outlined">
                    <p style={{ color: '#808080' }}>Confirmed Covid Cases </p>
                    <h2>{data?.attributes?.ConfirmedCovidCases}</h2>
                  </Card>}
            </div>
            <div style={{ margin: '20px 0px' }}>                            
                <Card variant="outlined">
                    <div>
                        <p style={{ color: '#808080' }}>14 Day Incidence Rate (Total) </p>
                        <Button style={{ color: 'black', position: 'absolute', marginTop: 2, right: 13 }} onClick={handleBtnClick}>
                            {!showBreakdown ? <ArrowCircleDownIcon /> : <ArrowCircleUpIcon/>}
                        </Button>
                    </div>
                    <h2>{getTotalIncidence()}</h2>
                </Card>
            </div>
        
            <div style={{ display: showBreakdown ? 'block' : 'none', width: '80%', margin: 'auto' }}>
                <p>County Breakdown</p>
                {
                    incidenceData?.map((item) => {
                        return (
                            <div style={{ margin: '20px 0px' }}>                            
                                <Card variant="outlined">
                                    <p style={{ color: '#808080' }}>
                                        {capitalizeFirstLetter(item?.attributes?.ENGLISH)}
                                        </p>
                                    <h2>{item?.attributes?.C19_P14_T}</h2>
                                </Card>
                            </div>       
                        )
                    })
                }
            </div>
            <div className="drawer-footer" style={{ position: 'absolute', right: 20, color: 'grey', fontSize: 14 }}>
                <p>Last Updated: {dateConvert(data?.attributes?.TimeStampDate)}</p>
            </div>
        </div>
    )
}