import { FC, ReactNode, Suspense, lazy } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SuspenseLoader from "@/components/SuspenseLoader";
import Footer from '@/components/Footer';
import { useAccount } from 'wagmi';
import HomeTasks from "@/content/applications/Tasks/HomeTasks";

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);


interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = () => {
  const theme = useTheme();
  const { data: accountData } = useAccount();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",

          ".MuiPageTitle-wrapper": {
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`,
          },
        }}
      >
        <Header data={accountData} />
        {accountData ? (
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              display: 'block',
              flex: 1
            }}
          >
            <Box display="block">
              <Outlet />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              display: 'block',
              flex: 1
            }}
          >
            <Box display="block">
              <HomeTasks />
            </Box>
          </Box>
        )
        }
        <Footer />
      </Box>
    </>
  );
};

export default BaseLayout;
