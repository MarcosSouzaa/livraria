// src/app/layout.tsx
import "./globals.css"; // Mantenha seus estilos globais
import { CartProvider } from "./provider/CartProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        {/* Envolvemos a aplicação no CartProvider */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
