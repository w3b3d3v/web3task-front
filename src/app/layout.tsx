"use client"
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import ThemeProviderWrapper from "@/theme/ThemeProvider";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { SearchFiltersProvider } from "@/contexts/SearchFiltersContext";
import { SnackBarProvider } from "@/contexts/SnackBarContext";
// import { WagmiConfig } from 'wagmi';
// import { client } from '@/lib/wagmi'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <WagmiConfig client={client}> */}
        <ThemeProviderWrapper>
          <SidebarProvider>
            <SearchFiltersProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                <SnackBarProvider>
                  {children}
                </SnackBarProvider>
              </LocalizationProvider>
            </SearchFiltersProvider>
          </SidebarProvider>
        </ThemeProviderWrapper>
        {/* </WagmiConfig> */}
      </body>
    </html>
  )
}