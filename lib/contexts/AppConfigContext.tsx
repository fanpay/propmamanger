'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppConfig {
    companyName: string;
    slogan: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        surface: string;
        textMain: string;
    };
    typography: {
        display: string;
        body: string;
    };
    contact: {
        phone: string;
        whatsapp: string;
        email: string;
        address: string;
        city: string;
        instagram: string;
        facebook: string;
    };
    commissions: {
        sale: number;
        rent: number;
    };
}

const defaultConfig: AppConfig = {
    companyName: 'PropManager',
    slogan: 'Tu patrimonio en las mejores manos',
    colors: {
        primary: '#1B3A5C', // Navy
        secondary: '#C8873A', // Gold/Bronze
        accent: '#34d399', // Green
        surface: '#F8F9FA', // Light Gray
        textMain: '#1A1A1A', // Dark
    },
    typography: {
        display: 'Outfit, sans-serif',
        body: 'DM Sans, sans-serif',
    },
    contact: {
        phone: '+57 300 000 0000',
        whatsapp: '573000000000',
        email: 'contacto@propmanager.com',
        address: 'Cra 43A # 1-50, Torre 1, Of 101',
        city: 'Medellín, Colombia',
        instagram: 'https://instagram.com/propmanager',
        facebook: 'https://facebook.com/propmanager',
    },
    commissions: {
        sale: 3,
        rent: 8,
    },
};

interface AppConfigContextType {
    config: AppConfig;
    updateConfig: (newConfig: Partial<AppConfig>) => void;
    updateColors: (colors: Partial<AppConfig['colors']>) => void;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

export function AppConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfigState] = useState<AppConfig>(defaultConfig);

    const updateConfig = (newConfig: Partial<AppConfig>) => {
        setConfigState((prev) => ({ ...prev, ...newConfig }));
    };

    const updateColors = (colors: Partial<AppConfig['colors']>) => {
        setConfigState((prev) => ({
            ...prev,
            colors: { ...prev.colors, ...colors },
        }));
    };

    return (
        <AppConfigContext.Provider value={{ config, updateConfig, updateColors }}>
            {children}
        </AppConfigContext.Provider>
    );
}

export function useAppConfig() {
    const context = useContext(AppConfigContext);
    if (context === undefined) {
        throw new Error('useAppConfig must be used within an AppConfigProvider');
    }
    return context;
}
