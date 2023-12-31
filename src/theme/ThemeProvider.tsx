import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LightTheme } from "./schemes/LightTheme";
import { DarkTheme } from "./schemes/DarkTheme";
import { ThemeProvider } from "@mui/system";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";

interface IThemeContextData {
  themeName: "light" | "dark";
  themeIcon: React.ReactNode;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

interface IThemeProviderWrapper {
  children: React.ReactNode;
}
const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = ({
  children,
}) => {
  const storage = typeof window !== "undefined" ? localStorage.theme : "light";
  const [storageTheme, setStorageTheme] = useState(storage);
  const [themeName, setThemeName] = useState<"light" | "dark">(storage);
  const [themeIcon, setThemeIcon] = useState<React.ReactNode>(
    <ModeNightIcon /> || <LightModeIcon />
  );

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") {
      setThemeIcon(<ModeNightIcon />);
      return LightTheme;
    }
    setThemeIcon(<LightModeIcon />);
    return DarkTheme;
  }, [themeName]);

  useEffect(() => {
    localStorage.setItem("theme", themeName);
    setStorageTheme(themeName);
  }, [theme, storageTheme, themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, themeIcon, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
