import { useContext, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { CaseContext } from './context/CaseContext';
import CustomMap from './components/MapComponent/CustomMap';
import CustomDrawer from './components/ControlPanel';

function App() {
  const { setCases, setCasesInc } = useContext(CaseContext);
  // const [dateInt, setDateInt] = useState(null);
  // const [dateConv, setDateConv] = useState(null);
  // const api = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,ConfirmedCovidDeaths,CovidCasesConfirmed,StatisticsProfileDate&outSR=4326&f=json'
  // const apiUrl = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
  const totalCountyCasesAPI = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
  const dayIncidenceRateAPI = 'https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/COVID19_14_Day_Incidence_Rate_per_100k_LEA/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'

  // Get Total Cases per County
  useEffect(() => {
    axios.get(totalCountyCasesAPI)
      .then(function(response) {
        setCases(response?.data?.features)
      })
  }, [])

  // Get 14 Day Cases per County (Incidence Rate)
  useEffect(() => {
    axios.get(dayIncidenceRateAPI)
      .then(function(response) {
        setCasesInc(response?.data?.features)
      })
  }, [])
  
  return (
    <div className="App">
      <CustomMap />
      <CustomDrawer />
    </div>
  );
}

export default App;
