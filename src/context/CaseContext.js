import React, { useState } from 'react';

export const CaseContext = React.createContext(null);

export const CaseProvider = ({ children }) => {
    const [cases, setCases] = useState(null);

    return (
        <CaseContext.Provider value={{ cases, setCases }}>
            { children }
        </CaseContext.Provider>
    )
}
