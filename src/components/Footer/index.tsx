import {
  Box,
  Container,
  Link,
  ListItem,
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
import Logo from "../LogoSign";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  const theme = useTheme();
  const logoImage = "/static/images/logo/logo-footer-" + theme.palette.mode + ".svg";

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
        <Logo logoImage={logoImage} />
        <Box>
          <ListItem>
            <Link href="/sobre-nos" underline="none">
              {'Sobre Nós'}
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/comunidade" underline="none">
              {'Comunidade'}
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/postagens" underline="none">
              {'Postagens'}
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/perguntas-frequentes" underline="none">
              {'Perguntas Frequentes'}
            </Link>
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
          &copy; 2023 Marketplace de Tarefas Web3Task
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
