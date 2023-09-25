import { useRoutes } from "react-router-dom";
import router from "./router";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProviderWrapper>
      <SidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </SidebarProvider>
    </ThemeProviderWrapper>
  );
}
export default App;
