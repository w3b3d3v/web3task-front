import {
  Box,
  Container,
  Link,
  ListItem,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import {
  BsGithub,
  BsYoutube,
  BsDiscord,
  BsTwitch,
  BsTwitterX,
  BsInstagram,
  BsLinkedin,
  BsFacebook,
} from "react-icons/bs";
import { Logo } from "../01-atoms";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`,
);

export function TheFooter() {
  const theme = useTheme();
  const logoImage =
    "/static/images/logo/logo-footer-" + theme.palette.mode + ".svg";

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
              {"Sobre Nós"}
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/comunidade" underline="none">
              {"Comunidade"}
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/postagens" underline="none">
              {"Postagens"}
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/perguntas-frequentes" underline="none">
              {"Perguntas Frequentes"}
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
            <BsFacebook size="30" />
            <BsTwitterX size="30" />
            <BsInstagram size="30" />
            <BsLinkedin size="30" />
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
