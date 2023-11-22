import { styled, useTheme } from "@mui/material";
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

function Logo({ logoImage }) {
  const theme = useTheme();

  return (
    <LogoWrapper to="/">
      <img
        style={{ width: "100%", height: "100%" }}
        src={logoImage}
        alt="Logo"
      />
    </LogoWrapper>
  );
}

export default Logo;
