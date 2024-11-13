import React, { createContext, ReactNode, useState } from 'react';

interface ContextState {
    exampleValue: string;
    setExampleValue: (value: string) => void;
}

const AppContext = createContext<ContextState | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [exampleValue, setExampleValue] = useState<string>('default value');

    return (
        <AppContext.Provider value={{ exampleValue, setExampleValue }}>
            {children}
        </AppContext.Provider>
    );
};