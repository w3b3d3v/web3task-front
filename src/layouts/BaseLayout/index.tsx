import { FC, ReactNode } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { useAccount } from "wagmi";
import { TheHeader } from "@/components/02-molecules/TheHeader";
import { TheFooter } from "@/components/02-molecules/TheFooter";
import { HomeSection } from "@/components/04-templates";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const { address } = useAccount();

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
                    0.15,
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1,
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05,
                  )}`,
          },
        }}
      >
        <TheHeader data={address} />
        {address ? (
          <Box
            sx={{
              position: "relative",
              zIndex: 5,
              display: "block",
              flex: 1,
            }}
          >
            <Box display="block">
              {children}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              zIndex: 5,
              display: "block",
              flex: 1,
            }}
          >
            <Box display="block">
              <HomeSection />
            </Box>
          </Box>
        )}
        <TheFooter />
      </Box>
    </>
  );
};

export default BaseLayout;
