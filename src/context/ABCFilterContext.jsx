import React, { createContext, useState, useContext } from 'react';

const ABCFilterContext = createContext();

export function ABCFilterProvider({ children }) {
    const [abcFilter, setAbcFilter] = useState('Todos');

    return (
        <ABCFilterContext.Provider value={{ abcFilter, setAbcFilter }}>
            {children}
        </ABCFilterContext.Provider>
    );
}

export function useABCFilter() {
    const context = useContext(ABCFilterContext);
    if (!context) {
        throw new Error('useABCFilter deve ser usado dentro de ABCFilterProvider');
    }
    return context;
}
