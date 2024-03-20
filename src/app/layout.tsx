import { NextAuthSessionProvider } from "../providers/sessionProvider";

import EstiloGlobal from "../styles";

import { ChakraProviders } from '../providers/chakraProviders'
import { UserProvider } from "./contexts/UserContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>

      <EstiloGlobal />
      <body>
        <UserProvider>
          <NextAuthSessionProvider>
            <ChakraProviders>{children}</ChakraProviders>
          </NextAuthSessionProvider>
        </UserProvider>
      </body>
    </html>
  );
}
