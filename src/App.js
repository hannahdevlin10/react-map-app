import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { CaseContext } from './context/CaseContext';
import CustomMap from './components/MapComponent/CustomMap';

function App() {
  const { cases, setCases } = useContext(CaseContext)
  const [dateInt, setDateInt] = useState(null);
  const [dateConv, setDateConv] = useState(null);
  const api = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,ConfirmedCovidDeaths,CovidCasesConfirmed,StatisticsProfileDate&outSR=4326&f=json'

  useEffect(() => {
    axios.get(api)
      .then(function(response) {
        setDateInt(response?.data?.features.at(-1).attributes.Date)
        setCases(response?.data?.features.at(-1).attributes.ConfirmedCovidCases)
      })
  })

  useEffect(() => {
    if (dateInt) {
      var unixts = dateInt;
      var date = new Date(unixts);
      var fdate = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' +  date.getFullYear();
      setDateConv(fdate);
    }
  }, [dateInt])
  
  return (
    <div className="App">
      {/* <h5>Cases from {dateConv}</h5>
      <h2>{cases}</h2> */}
      <CustomMap />
    </div>
  );
}

export default App;
