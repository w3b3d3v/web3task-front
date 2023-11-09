import { IconButton, Tooltip } from "@mui/material";
import { useThemeContext } from "@/theme/ThemeProvider";

const HeaderToggleTheme = () => {
  const { toggleTheme, themeIcon } = useThemeContext();

  return (
    <Tooltip arrow title="Theme">
      <IconButton color="primary" onClick={toggleTheme}>
        {themeIcon}
      </IconButton>
    </Tooltip>
  );
};

export default HeaderToggleTheme;
