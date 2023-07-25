import { Box, Container, Link, Typography, styled } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BsDiscord } from "react-icons/bs"

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
        height='400'
      >

        <Box>
          <Typography variant="subtitle1">
           &copy; 2023 - WEB3DEV
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by{' '}
          <Link href="#" target="_blank" rel="noopener noreferrer">
          Web3Dev.com 
          </Link>
        </Typography>
      </Box>

      <Box
      display='flex'
      justifyContent='right'
      alignItems='center'
      >        
          <BsDiscord size="30"/> <TwitterIcon fontSize="large"/> <InstagramIcon fontSize="large"/> <LinkedInIcon fontSize="large"/>
        </Box>
    </FooterWrapper>
  );
}

export default Footer;
