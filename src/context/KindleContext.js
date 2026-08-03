import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const KindleContext = createContext(null);

const MIN_FONT_SCALE = 0.85;
const MAX_FONT_SCALE = 1.1;

export function KindleProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('kindle-theme', 'light');
  const [fontScale, setFontScale] = useLocalStorage('kindle-font-scale', 0.95);
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const increaseFontSize = () => {
    setFontScale((previousValue) =>
      Math.min(MAX_FONT_SCALE, Number((previousValue + 0.05).toFixed(2))),
    );
  };

  const decreaseFontSize = () => {
    setFontScale((previousValue) =>
      Math.max(MIN_FONT_SCALE, Number((previousValue - 0.05).toFixed(2))),
    );
  };

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === 'light' ? 'dark' : 'light',
    );
  };

  const value = {
    theme,
    fontScale,
    increaseFontSize,
    decreaseFontSize,
    toggleTheme,
  };

  return (
    <KindleContext.Provider value={value}>{children}</KindleContext.Provider>
  );
}

export function useKindle() {
  const context = useContext(KindleContext);

  if (!context) {
    throw new Error('useKindle must be used inside KindleProvider');
  }

  return context;
}
