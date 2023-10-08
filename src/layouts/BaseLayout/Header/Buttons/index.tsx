import { Box } from "@mui/material";
import HeaderNotifications from "./Notifications";
import HeaderToggleTheme from "./ToggleTheme";

function HeaderButtons() {
  return (
    <>
      <Box sx={{ mr: 1 }}>
        <Box sx={{ mx: 0.5 }} component="span">
          <HeaderNotifications />
          <HeaderToggleTheme />
        </Box>
      </Box>
    </>   
  );
}

export default HeaderButtons;
