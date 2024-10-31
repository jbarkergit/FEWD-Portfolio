import { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';

const LayoutContext = createContext<{ layoutAttr: string } | undefined>(undefined);

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [layoutAttr, setLayoutAttr] = useState<string>('xxl');

  const getDataLayout = () => {
    const winX: number = window.innerWidth;
    let layout: string;

    switch (true) {
      case winX >= 1410:
        layout = 'xxl';
        break;
      case winX < 1410 && winX > 1212:
        layout = 'xl';
        break;
      case winX <= 1212 && winX > 1032:
        layout = 'l';
        break;
      case winX <= 1032 && winX > 836:
        layout = 'm';
        break;
      case winX <= 836 && winX > 632:
        layout = 's';
        break;
      case winX <= 632 && winX > 0:
        layout = 'xs';
        break;
      default:
        layout = 'xxl';
        break;
    }

    setLayoutAttr(layout);
  };

  useEffect(() => {
    getDataLayout();
    window.addEventListener('resize', getDataLayout);
    return () => window.removeEventListener('resize', getDataLayout);
  }, []);

  return (
    <LayoutContext.Provider value={{ layoutAttr }}>
      <div className='filmDatabase' data-layout-carousel={layoutAttr}>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};
