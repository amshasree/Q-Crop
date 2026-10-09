import React, { createContext, useContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    appName: 'Quantum Farming',
    appSubtitle: 'Kisan Advisory & Crop Assist',
    dashboard: 'Dashboard',
    myFarm: 'My Farm Setup',
    weather: 'Weather Center',
    yieldPlanner: 'Yield Calculator',
    cropAdvisor: 'Crop Advisor & Care',
    marketPrices: 'Mandi Market Prices',
    soilHealth: 'Soil Health Card',
    science: 'Science & How It Works',
    about: 'About Platform',
    welcomeFarmer: 'Welcome back, Farmer!',
    getAdvice: 'Get Crop Advice',
    viewMyFarm: 'View My Farm',
    sampleDataMode: 'Sample Demo Mode',
    offlineNotice: 'Offline Mode: Local farm profile & cached guidance are available.',
    teluguNotice: 'Telugu Language Support is currently in Preview Mode. Core menus are translated; scientific advisory terms default to English until verified.'
  },
  te: {
    appName: 'క్వాంటమ్ ఫార్మింగ్',
    appSubtitle: 'కిసాన్ సలహా & పంట సహాయం',
    dashboard: 'డాష్‌బోర్డ్',
    myFarm: 'నా పొలం అమరిక',
    weather: 'వాతావరణ కేంద్రం',
    yieldPlanner: 'దిగుబడి క్యాలిక్యులేటర్',
    cropAdvisor: 'పంట సలహాదారు',
    marketPrices: 'మార్కెట్ ధరలు',
    soilHealth: 'నేల ఆరోగ్య కార్డ్',
    science: 'సైన్స్ & ఎలా పనిచేస్తుంది',
    about: 'ప్లాట్‌ఫారమ్ గురించి',
    welcomeFarmer: 'స్వాగతం, రైతు సోదరా!',
    getAdvice: 'పంట సలహా పొందండి',
    viewMyFarm: 'నా పొలం చూడండి',
    sampleDataMode: 'నమూనా డెమో మోడ్',
    offlineNotice: 'ఆఫ్‌లైన్ మోడ్: స్థానిక ప్రొఫైల్ అందుబాటులో ఉంది.',
    teluguNotice: 'తెలుగు భాషా మద్దతు ప్రస్తుతం ప్రివ్యూ మోడ్‌లో ఉంది. ముఖ్యాంశాలు తెలుగులో చూపబడతాయి.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('q_farming_lang') || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('q_farming_lang', lang);
  };

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
