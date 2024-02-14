import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  Typography,
  styled,
  useMediaQuery,
  useTheme
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { BsGithub, BsYoutube } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { BsTwitch } from "react-icons/bs";
import Logo from "../LogoSign";
import { spacing } from "@mui/system";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const logoImage = "/static/images/logo/logo-footer-" + theme.palette.mode + ".svg";

  return (
    <FooterWrapper
      className="footer-wrapper"
      color={theme.colors.alpha.trueWhite[100]}
    >
      <Box
        pb={4}
        sx={{ display: mdDown ? 'block' : 'flex', justifyContent: mdDown ? 'center' : 'space-between', ml: mdDown && 5 }}
        alignItems="center"
        textAlign={{ xs: "center", md: "center" }}
        height="400"
      >
        <Box sx={{ display: mdDown && 'flex', justifyContent: mdDown && 'center' }}>
          <Logo logoImage={logoImage} />
        </Box>

        <Box sx={{ display: mdDown && 'flex', justifyContent: mdDown && 'center', textAlign: 'center' }}>
          <List sx={{ spacing: mdDown && 1 }}>
            <ListItem sx={{ textAlign: 'center' }}>
              <Link href="/about-us" underline="none">
                {'About us'}
              </Link>
            </ListItem>

            <ListItem sx={{ textAlign: 'center' }}>
              <Link href="/" underline="none">
                {'Explore'}
              </Link>
            </ListItem>

            <ListItem sx={{ textAlign: 'center' }}>
              <Link href="/documentation" underline="none">
                {'Docs'}
              </Link>
            </ListItem>

            <ListItem sx={{ textAlign: 'center' }}>
              <Link sx={{ textAlign: 'center' }} href="/faq" underline="none">
                {'FAQ'}
              </Link>
            </ListItem>

          </List>
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
            Join us!
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            alignItems="center"
            gap={mdDown ? 0.1 : 2}
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
      <Box sx={{ display: "flex", justifyContent: "center", ml: mdDown && 1, width: '100%' }}>
        <Typography variant="subtitle1">
          &copy; 2023 Web3Task - Tasks Marketplace
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
