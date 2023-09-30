import {
  styled,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 200px;
        margin: 5 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  const theme = useTheme();

  const logoImage = "/static/images/logo/logo-" + theme.palette.mode + "2.svg"

  return (
    <LogoWrapper to="/overview">
      <img
        style={{ width: '100%', height: '100%' }}
        src={logoImage}
        alt="Logo"
      />
    </LogoWrapper>
  );
}

export default Logo;
