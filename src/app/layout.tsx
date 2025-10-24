// src/app/layout.tsx
import "./globals.css";
import { CartProvider } from "./provider/CartProvider";
import Navbar from "./_component/Navbar";
import WhatsappFAB from "./_component/WhatsappFAB"; // <--- NOVO IMPORT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          <Navbar />

          {children}

          {/* O botão flutuante aparece em todas as páginas */}
          <WhatsappFAB />
        </CartProvider>
      </body>
    </html>
  );
}
