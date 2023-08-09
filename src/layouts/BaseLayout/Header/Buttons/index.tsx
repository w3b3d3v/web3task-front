import { Box } from "@mui/material";
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import HeaderLocaleLanguage from "src/components/LocaleLanguage";
function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
      <HeaderLocaleLanguage />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
