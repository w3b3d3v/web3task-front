import { useRoutes } from "react-router-dom";
import router from "./router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchFiltersProvider } from "./contexts/SearchFiltersContext";
import { SnackBarProvider } from "./contexts/SnackBarContext";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProviderWrapper>
      <SidebarProvider>
        <SearchFiltersProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <SnackBarProvider>
              {content}
            </SnackBarProvider>
          </LocalizationProvider>
        </SearchFiltersProvider>
      </SidebarProvider>
    </ThemeProviderWrapper>
  );
}
export default App;
