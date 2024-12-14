'use client'; // Ensure this runs on the client side

import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../../utils/themeSettings";
interface AppProvidersProps {
  children: React.ReactNode;
  session: any,
}


export default function AppProviders({ children, session }: AppProvidersProps) {

  return (
        <SessionProvider session={session}>
          <MuiThemeProvider theme={lightTheme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </SessionProvider>
  );
}
