import React, { useState } from 'react';

export const CaseContext = React.createContext(null);

export const CaseProvider = ({ children }) => {
    const [cases, setCases] = useState(null);
    const [casesInc, setCasesInc] = useState(null);
    const [countryCases, setCountryCases] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    return (
        <CaseContext.Provider value={{ cases, setCases, casesInc, setCasesInc, countryCases, setCountryCases, selectedCounty, setSelectedCounty, panelOpen, setPanelOpen }}>
            { children }
        </CaseContext.Provider>
    )
}
