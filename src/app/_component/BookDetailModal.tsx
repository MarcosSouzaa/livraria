// src/app/_component/BookDetailModal.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Book, IBook } from "../../../libs/domain/book/Book";

interface BookDetailModalProps {
  bookData: IBook; // Passamos os dados puros
  onClose: () => void;
  onAddToCart: () => void; // Para adicionar ao carrinho direto do modal
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  bookData,
  onClose,
  onAddToCart,
}) => {
  const book = new Book(bookData); // Usamos a classe para métodos de domínio

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Importante
    onAddToCart(); // Chama a função que adiciona no BookCard.tsx
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Fecha ao clicar fora
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full h-[85vh] md:h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        {/* LADO ESQUERDO: IMAGEM GRANDE */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-gray-200 flex-shrink-0">
          <Image
            src={book.coverImageUrl}
            alt={`Capa do livro: ${book.title}`}
            fill={true}
            style={{ objectFit: "contain" }} // Mostra a imagem completa
            className="p-4"
          />
        </div>

        {/* LADO DIREITO: DETALHES */}
        <div className="p-6 md:w-1/2 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {book.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Por: {book.author}
          </p>

          <div className="flex justify-between items-center mb-4">
            <p className="text-4xl font-extrabold text-green-600">
              {book.getFormattedPrice()}
            </p>
            <span
              className={`px-3 py-1 text-sm rounded font-semibold ${
                book.isAvailable()
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
              title={
                book.isAvailable()
                  ? `Temos ${book.stock} unidades em estoque.`
                  : "Esgotado"
              }
            >
              {book.isAvailable() ? "Em Estoque" : "Esgotado"}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <span className="font-semibold">Condição:</span> {book.condition}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>

          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Descrição
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-8">
            {book.description}
          </p>

          {/* Botão Adicionar ao Carrinho */}
          <button
            onClick={handleAddToCart}
            disabled={!book.isAvailable()}
            className={`w-full py-3 rounded-lg font-bold transition-colors duration-300 
                  ${
                    book.isAvailable()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
          >
            {book.isAvailable() ? "Adicionar ao Carrinho" : "Esgotado"}
          </button>
        </div>

        {/* Botão de Fechar no canto superior direito do modal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-700 dark:text-white text-3xl hover:text-red-500 transition-colors"
          aria-label="Fechar"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default BookDetailModal;
