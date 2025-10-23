// src/app/_component/BookList.tsx
// Este será um Client Component, pois ele é puramente de apresentação.
"use client";

import React from "react";
import { Book } from "../../../libs/domain/book/Book";
import BookCard from "./BookCard"; // Componente que vamos criar

// Definição das Props (Propriedades) do componente
interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books.length === 0) {
    return <p>Nenhum livro encontrado no catálogo.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        // Usamos a propriedade de Domínio 'id' como key, que é única.
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
