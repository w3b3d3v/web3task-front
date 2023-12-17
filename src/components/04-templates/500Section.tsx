"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Typography, Button } from "@mui/material";
import { Container, Box, styled } from "@mui/system";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);

export const Error500Section = () => {
  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }
  return (
    <MainContent>
      <Grid
        container
        sx={{ height: "100%", display: "flex", justifyContent: "center" }}
        alignItems="stretch"
        spacing={0}
      >
        <Grid
          xs={12}
          md={6}
          alignItems="center"
          display="flex"
          justifyContent="center"
          item
        >
          <Container maxWidth="sm">
            <Box textAlign="center">
              <img alt="500" height={260} src="/static/images/status/500.svg" />
              <Typography variant="h2" sx={{ my: 2 }}>
                There was an error, please try again later
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                The server encountered an internal error and was not able to
                complete your request
              </Typography>
              <LoadingButton
                onClick={handleClick}
                loading={pending}
                variant="outlined"
                color="primary"
                startIcon={<HiOutlineRefresh />}
              >
                Refresh view
              </LoadingButton>
              <Button href="/" variant="contained" sx={{ ml: 1 }}>
                Go back
              </Button>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </MainContent>
  );
};
