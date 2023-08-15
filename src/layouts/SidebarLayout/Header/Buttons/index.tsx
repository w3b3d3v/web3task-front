import { Box } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications";
import HeaderLocaleLanguage from "src/components/LocaleLanguage";
import HeaderToggleTheme from "./ToggleTheme";

function HeaderButtons() {
  return (
    <>
      <HeaderLocaleLanguage />
      <Box sx={{ mr: 1 }}>
        <HeaderSearch />      
        <Box sx={{ mx: 0.5 }} component="span">
          <HeaderNotifications />
          <HeaderToggleTheme />
        </Box>
      </Box>
    </>    
  );
}

export default HeaderButtons;
