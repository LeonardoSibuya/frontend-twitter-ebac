import { NextAuthSessionProvider } from "../providers/sessionProvider";

import EstiloGlobal from "../styles";

import { ChakraProviders } from '../providers/chakraProviders'

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
        <NextAuthSessionProvider>
          <ChakraProviders>{children}</ChakraProviders>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
