import { useRoutes } from "react-router-dom";
import router from "./router";
import { forwardRef, useState } from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import { SidebarProvider } from "./contexts/SidebarContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {
  const content = useRoutes(router);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleCloseSnackSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseSnackError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  return (
    <ThemeProviderWrapper>
      <SidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSnackSuccess}>
            <Alert onClose={handleCloseSnackSuccess} severity="success" sx={{ width: '100%' }}>
              Task created with sucess!
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnackError}>
            <Alert onClose={handleCloseSnackError} severity="error" sx={{ width: '100%' }}>
              Task not created! Try again!
            </Alert>
          </Snackbar>
          {content}
        </LocalizationProvider>
      </SidebarProvider>
    </ThemeProviderWrapper>
  );
}
export default App;
