// src/app/_component/FilteredBookList.tsx
"use client";

import React, { useState, useMemo } from "react";
import { IBook } from "../../../libs/domain/book/Book";
import BookList from "./BookList"; // Seu BookList existente

interface FilteredBookListProps {
  initialBooks: IBook[];
}

const FilteredBookList: React.FC<FilteredBookListProps> = ({
  initialBooks,
}) => {
  const [filter, setFilter] = useState<"all" | "Novo" | "Usado">("all");

  // Lógica de filtragem dos livros
  const filteredBooks = useMemo(() => {
    if (filter === "all") {
      return initialBooks;
    }
    return initialBooks.filter((book) => book.condition === filter);
  }, [initialBooks, filter]);

  return (
    <div>
      {/* Botões de Filtro */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("Novo")}
          className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
            filter === "Novo"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Livros Novos
        </button>
        <button
          onClick={() => setFilter("Usado")}
          className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
            filter === "Usado"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Livros Usados
        </button>
      </div>

      {/* Renderiza a lista de livros filtrada */}
      <BookList books={filteredBooks} />
    </div>
  );
};

export default FilteredBookList;
