'use client';
import React, { createContext, useContext, useState } from 'react';

interface ViewContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState("Study Mode");
    return (
        <ViewContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </ViewContext.Provider>
    );
}

export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useView must be used within a ViewProvider");
    }
    return context;
};