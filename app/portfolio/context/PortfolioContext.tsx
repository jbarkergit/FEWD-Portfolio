import { createContext, useContext, useState, type FC, type ReactNode } from 'react';

type Context = {
  projectSlideIndex: number;
  setProjectSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  portMobileMenu: boolean;
  setPortMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const PortfolioContext = createContext<Context | undefined>(undefined);

export const PortfolioProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Active Project Slide Index Tracker
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  // Active grid position tracker
  const [featureState, setFeatureState] = useState<Record<string, boolean>>({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  // Carousel navigation menu
  const [portMobileMenu, setPortMobileMenu] = useState<boolean>(false);

  const contextValue = {
    projectSlideIndex,
    setProjectSlideIndex,
    featureState,
    setFeatureState,
    portMobileMenu,
    setPortMobileMenu,
  };

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>;
};

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('PortfolioProvider is required');
  return context;
};
