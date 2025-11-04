// src/app/_component/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../provider/CartProvider"; // Hook para acessar o carrinho
//import { ShoppingCart } from "lucide-react"; // Ícone de carrinho (Se você não tem 'lucide-react', use um texto ou outro ícone)

// Se você não instalou 'lucide-react', instale agora:
// npm install lucide-react

const Navbar: React.FC = () => {
  // Acessamos o estado global do carrinho
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO (Link para a Home) */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          EDUCA VITRINE+
        </Link>

        {/* NAVEGAÇÃO PRINCIPAL (Simplificada) */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Sobre Nós
          </Link>

          {/* Implementação do Falar com WhatsApp (Próximo Requisito) */}
          <a
            href="https://wa.me/5521987323010?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20os%20livros."
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:text-green-700 transition-colors"
          >
            WhatsApp
          </a>
        </nav>

        {/* BOTÃO DO CARRINHO */}
        <Link
          href="/cart"
          className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {/*<ShoppingCart className="w-6 h-6 text-gray-700" />*/}
          <span>🛒</span>

          {/* Contador de Itens */}
          {totalItems > 0 && (
            <span className="absolute -top-0 -right-0 flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
