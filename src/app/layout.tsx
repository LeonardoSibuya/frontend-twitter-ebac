import EstiloGlobal from "../styles";

import { Providers } from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">

      <EstiloGlobal />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
