import { useEffect, useState } from "react";
import { Box, Container, Card } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Logo from "@/components/02-molecules/LogoSign";
import Hero from "./Hero";
import SuspenseLoader from "@/components/01-atoms/SuspenseLoader";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <SuspenseLoader />
      ) : (
        <OverviewWrapper>
          <Helmet>
            <title>{"overview.title"}</title>
          </Helmet>
          <Container maxWidth="lg">
            <Box
              display="flex"
              justifyContent="center"
              py={5}
              alignItems="center"
            ></Box>
            <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
              <Hero />
            </Card>
          </Container>
        </OverviewWrapper>
      )}
    </>
  );
}

export default Overview;
