import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

interface IThemeProviderWrapper {
  children: React.ReactNode;
}
const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = (props) => {
  const curThemeName = localStorage.getItem("appTheme") || "LightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
