// src/app/layout.tsx
import "./globals.css";
import { CartProvider } from "./provider/CartProvider";
import Navbar from "./_component/Navbar";
import WhatsappFAB from "./_component/WhatsappFAB";
import Footer from "./_component/Footer"; // <--- NOVO IMPORT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* Para garantir que o footer fique no final, a tag body precisa ter min-h-screen 
        e o conteúdo principal precisa ser flex-grow.
        Como o Next.js lida com isso de forma diferente, faremos um ajuste simples.
      */}
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          {/* Envolvemos o conteúdo principal em uma div flexível */}
          <div className="flex-grow">{children}</div>
          <WhatsappFAB />
          <Footer /> {/* <--- ADICIONAMOS O RODAPÉ AQUI */}
        </CartProvider>
      </body>
    </html>
  );
}
