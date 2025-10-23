// src/app/layout.tsx
import "./globals.css";
import { CartProvider } from "./provider/CartProvider";
import Navbar from "./_component/Navbar"; // <--- NOVO IMPORT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          {/* Adicionamos a Navbar aqui, fora do 'children', para que ela seja fixa */}
          <Navbar />

          {/* O 'children' é o conteúdo da página atual (Home, Detalhes, Carrinho) */}
          {children}

          {/* Aqui poderia vir o FooterNav/Footer */}
        </CartProvider>
      </body>
    </html>
  );
}
