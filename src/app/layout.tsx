import EstiloGlobal from "../styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <EstiloGlobal />
      <body>{children}</body>
    </html>
  );
}
