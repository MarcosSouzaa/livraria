// src/app/_component/BookCard.tsx
"use client";

import React from "react";
import Image from "next/image"; // Componente de imagem otimizado do Next.js
import Link from "next/link"; // Componente de link do Next.js
import { Book, IBook } from "../../../libs/domain/book/Book";

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book: BookData }) => {
  const book = new Book(BookData);

  return (
    // Link para a página de detalhes (que criaremos depois: /book/[id])
    <Link
      href={`/book/${book.id}`}
      className="block border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full h-64 bg-gray-200">
        {/* Usamos o componente Image para otimizar as imagens */}
        <Image
          src={book.coverImageUrl}
          alt={`Capa do livro: ${book.title}`}
          fill={true} // Preenche o contêiner
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{book.title}</h3>
        <p className="text-gray-600 italic mb-2">{book.author}</p>

        {/* Chamamos a Lógica de Domínio para formatar o preço */}
        <p className="text-2xl font-bold text-green-600 mb-2">
          {book.getFormattedPrice()}
        </p>

        {/* Chamamos a Lógica de Domínio para verificar disponibilidade */}
        <span
          className={`px-2 py-1 text-sm rounded ${
            book.isAvailable()
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {book.isAvailable() ? "Em Estoque" : "Esgotado"}
        </span>
      </div>
    </Link>
  );
};

export default BookCard;
