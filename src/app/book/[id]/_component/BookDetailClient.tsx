// src/app/book/[id]/_component/BookDetailClient.tsx (AJUSTE DE FLUXO)
"use client";

import React, { useState } from "react";
import { IBook, Book } from "../../../../../libs/domain/book/Book";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import ImageModal from "../../../_component/ImageModal";
import { useCart } from "@/app/provider/CartProvider";
import { useRouter } from "next/navigation"; // 🚨 NOVO: Importe o Router

interface BookDetailClientProps {
  bookData: IBook;
}

const BookDetailClient: React.FC<BookDetailClientProps> = ({ bookData }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const { addItem } = useCart();
  const router = useRouter(); // 🚨 NOVO: Inicialize o Router
  const book = new Book(bookData);

  const handleAddToCart = () => {
    addItem(bookData);

    // 🚨 NOVO FLUXO:
    // 1. Redireciona para a página do carrinho após adicionar
    router.push("/cart");

    // 2. O modal de ampliação da imagem, se estiver aberto, será destruído pelo redirecionamento,
    // mas se o botão de adicionar estivesse no modal de detalhes (BookDetailModal),
    // faríamos um setIsModalOpen(false) aqui.

    // Se você estiver no modal de *imagem* (ImageModal), a lógica de adicionar
    // deve ocorrer na página de detalhes, e o ImageModal só amplia.
    // Vamos garantir que o clique no botão de ADICIONAR está APENAS na página de detalhes, não no modal de imagem.
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 min-h-screen flex flex-col lg:flex-row gap-8">
        {/* LADO ESQUERDO: IMAGEM CLICÁVEL */}
        <div className="lg:w-1/3 flex-shrink-0">
          {/* ... Código da Imagem ... */}
          <div
            className="relative w-full h-96 cursor-pointer rounded-lg overflow-hidden shadow-xl"
            onClick={() => setIsImageOpen(true)} // Abre o modal ao clicar
            title="Clique para ampliar a imagem"
          >
            {/* ... */}
          </div>
        </div>

        {/* LADO DIREITO: DETALHES */}
        <div className="lg:w-2/3">
          {/* ... Detalhes ... */}

          {/* Botão Adicionar ao Carrinho */}
          <AddToCartButton book={bookData} onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DO MODAL DE AMPLIAÇÃO */}
      {isImageOpen && (
        <ImageModal
          src={book.coverImageUrl}
          alt={`Capa do livro: ${book.title}`}
          onClose={() => setIsImageOpen(false)}
        />
      )}
    </>
  );
};

export default BookDetailClient;
