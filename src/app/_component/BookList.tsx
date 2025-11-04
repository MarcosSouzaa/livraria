// src/app/_component/BookList.tsx (AJUSTADO PARA ABRIR O MODAL E GERENCIAR O FLUXO)
"use client";

import React, { useState } from "react";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailModal"; // Importe o Modal
import { IBook } from "../../../libs/domain/book/Book";
import { useCart } from "@/app/provider/CartProvider"; // Para adicionar
import { useRouter } from "next/navigation"; // Para redirecionar

interface BookListProps {
  books: IBook[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null); // Estado do Modal
  const { addItem } = useCart();
  const router = useRouter(); // Inicializa o router

  // 1. Função para abrir o modal
  const handleOpenModal = (book: IBook) => {
    setSelectedBook(book);
  };

  // 2. Função principal: Adicionar e Navegar (fechamento é feito dentro do Modal)
  const handleAddToCartAndNavigate = (book: IBook) => {
    addItem(book);

    // Opcional, mas recomendado: Mantenha o setSelectedBook(null) aqui para garantir.
    setSelectedBook(null);

    // 🚨 3. REDIRECIONAR PARA O CARRINHO
    router.push("/cart");
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            bookData={book}
            // 🚨 Passa a função para abrir o modal no clique do card
            onDetailsClick={() => handleOpenModal(book)}
          />
        ))}
      </div>

      {/* 🚨 RENDERIZAÇÃO DO MODAL */}
      {selectedBook && (
        <BookDetailModal
          bookData={selectedBook}
          onClose={() => setSelectedBook(null)}
          // 🚨 Passa a função que adiciona e redireciona
          onAddToCart={() => handleAddToCartAndNavigate(selectedBook)}
        />
      )}
    </>
  );
};

export default BookList;
