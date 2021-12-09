import React, { useContext, useEffect, useState } from 'react';
import { CaseContext } from '../../../context/CaseContext';
import { Autocomplete, Card, TextField } from '@mui/material';
import axios from 'axios';

export default function CountryDashboard () {
    const { countryCases, setCountryCases } = useContext(CaseContext);
    const [dateOptions, setDateOptions] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const countryCasesAPI = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
    // Get daily cases for entire country (split into demographics)
    useEffect(() => {
      axios.get(countryCasesAPI)
        .then(function(response) {
            setCountryCases(response?.data?.features)
        })
    }, [])

    useEffect(() => {
        setDateOptions(countryCases?.map((item) => item?.attributes?.Date).reverse());
    }, [countryCases]);

    const dateConvert = (epoch) => {
        if (epoch) {
            var unixts = epoch;
            var date = new Date(unixts);
            var fdate = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' +  date.getFullYear();
            return fdate;
        }
    }

    const handleOptionSelect = (value) => {
        setSelectedDate(value);
        setFilteredData(countryCases?.filter((obj) => dateConvert(obj?.attributes?.Date) === value))
    }

    return (
        <div>
            
            <div>
                <Autocomplete
                    disablePortal
                    id="cases-by-date-filter"
                    options={dateOptions?.map((date) => dateConvert(date))}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => handleOptionSelect(value)}
                    renderInput={(params) => <TextField {...params} label="Select Date" />}
                />
            </div>

            {filteredData && <h3>Stats for {selectedDate}</h3>}

            {
                filteredData && filteredData[0]?.attributes?.ConfirmedCovidCases && (
                  <div style={{ margin: '15px 0px' }}>
                    <Card variant="outlined">
                        <p style={{ color: '#808080' }}>Confirmed Covid Cases </p>
                        <h2>{filteredData[0]?.attributes?.ConfirmedCovidCases}</h2>
                    </Card>
                  </div>
                )
            }

            {
                filteredData && (
                  <div style={{ margin: '15px 0px' }}>
                    <Card variant="outlined">
                        <p style={{ color: '#808080' }}>Confirmed Covid Deaths </p>
                        <h2>{filteredData[0]?.attributes?.ConfirmedCovidDeaths || 0}</h2>
                    </Card>
                  </div>
                )
            }

            {filteredData && <div style={{ border: '0.5px solid rgba(0, 0, 0, 0.12)', width: '100%', height: 0, marginTop: 30 }} />}

            {filteredData && <h3>Total Stats by {selectedDate}</h3>}

            {
                filteredData && filteredData[0]?.attributes?.HospitalisedCovidCases && (
                  <div style={{ margin: '15px 0px' }}>
                    <Card variant="outlined">
                        <p style={{ color: '#808080' }}>Hospitalised Covid Cases </p>
                        <h2>{filteredData[0]?.attributes?.HospitalisedCovidCases}</h2>
                    </Card>
                  </div>
                )
            }

            {
                filteredData && filteredData[0]?.attributes?.HealthcareWorkersCovidCases && (
                  <div style={{ margin: '15px 0px' }}>
                    <Card variant="outlined">
                        <p style={{ color: '#808080' }}>Healthcare Workers Covid Cases </p>
                        <h2>{filteredData[0]?.attributes?.HealthcareWorkersCovidCases}</h2>
                    </Card>
                  </div>
                )
            }

            {
                filteredData && filteredData[0]?.attributes?.Male && filteredData[0]?.attributes?.Female && (
                    <div style={{ margin: '15px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Male </p>
                                <h2>{filteredData[0]?.attributes?.Male}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '48%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Female </p>
                                <h2>{filteredData[0]?.attributes?.Female}</h2>
                            </Card>
                        </div>
                      
                    </div>
                )
            }

            {
                filteredData
                && filteredData[0]?.attributes?.Aged1to4
                && filteredData[0]?.attributes?.Aged5to14
                && filteredData[0]?.attributes?.Aged15to24
                && filteredData[0]?.attributes?.Aged25to34
                && (
                    <div style={{ margin: '15px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 1-4 </p>
                                <h2>{filteredData[0]?.attributes?.Aged1to4}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 5-14 </p>
                                <h2>{filteredData[0]?.attributes?.Aged5to14}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 15-24 </p>
                                <h2>{filteredData[0]?.attributes?.Aged15to24}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 25-34 </p>
                                <h2>{filteredData[0]?.attributes?.Aged25to34}</h2>
                            </Card>
                        </div>
                      
                    </div>
                )
            }

            {
                filteredData
                && filteredData[0]?.attributes?.Aged35to44
                && filteredData[0]?.attributes?.Aged45to54
                && filteredData[0]?.attributes?.Aged55to64
                && filteredData[0]?.attributes?.Aged65to74
                && (
                    <div style={{ margin: '15px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 35-44 </p>
                                <h2>{filteredData[0]?.attributes?.Aged35to44}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 45-54 </p>
                                <h2>{filteredData[0]?.attributes?.Aged45to54}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 55-64 </p>
                                <h2>{filteredData[0]?.attributes?.Aged55to64}</h2>
                            </Card>
                        </div>
                        <div style={{ width: '23%' }}>
                            <Card variant="outlined">
                                <p style={{ color: '#808080' }}>Aged 65-74 </p>
                                <h2>{filteredData[0]?.attributes?.Aged65to74}</h2>
                            </Card>
                        </div>
                      
                    </div>
                )
            }
            

        </div>
    )
}