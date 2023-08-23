import { useEffect, useState } from 'react';
import { Box, Container, Card } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { styled } from "@mui/material/styles";
import Logo from "src/components/LogoSign";
import Hero from "./Hero";
import SuspenseLoader from 'src/components/SuspenseLoader';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  const { t, ready } = useTranslation(['content-overview']);
  const [ loading, setLoading ] = useState<boolean>(true);
  
  useEffect(() => {
    if (ready)
      setLoading(false);
  }, [])

  return (
    <>
    {
      loading 
      ? <SuspenseLoader />
      : 
      <OverviewWrapper>
        <Helmet>
          <title>{ t('overview.title') }</title>
        </Helmet>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" py={5} alignItems="center">
            <Logo />
          </Box>
          <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
            <Hero />
          </Card>
        </Container>
      </OverviewWrapper>
    }
    </>    
  );
}

export default Overview;
