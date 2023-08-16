import {
  Box,
  Container,
  ListItem,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { BsGithub, BsYoutube } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { BsTwitch } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  const theme = useTheme();

  return (
    <FooterWrapper
      className="footer-wrapper"
      color={theme.colors.alpha.trueWhite[100]}
    >
      <Box
        pb={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
        height="400"
      >
        <img src="/static/images/logo/pod3labs-logo.png" alt="PodLabsIcon" width={200} height={200} />

        <Box>
          <ListItem component={NavLink} to="/sobre-nos">
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Sobre Nós"
            />
          </ListItem>

          <ListItem component={NavLink} to="/comunidade">
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Comunidade"
            />
          </ListItem>

          <ListItem component={NavLink} to="/postagens">
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Postagens"
            />
          </ListItem>

          <ListItem component={NavLink} to="/perguntas-frequentes">
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Perguntas Frequentes"
            />
          </ListItem>
        </Box>

        <Box>
          <Typography
            sx={{
              pt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "1rem",
            }}
            variant="subtitle1"
          >
            Junte-se a nós
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <FacebookIcon fontSize="large" />
            <TwitterIcon fontSize="large" />
            <InstagramIcon fontSize="large" />
            <LinkedInIcon fontSize="large" />
            <BsGithub size="30" />
            <BsDiscord size="30" />
            <BsTwitch size="30" />
            <BsYoutube size="30" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="subtitle1">
          &copy; 2023 Marketplace de Tarefas Podlabs
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
