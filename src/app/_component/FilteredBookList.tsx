// src/app/_component/FilteredBookList.tsx (CORRIGIDO)
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IBook } from "../../../libs/domain/book/Book";
import BookList from "./BookList";

interface FilteredBookListProps {
  initialBooks: IBook[];
}

// Mapeamento dos botões para o valor que o Firestore espera (e que page.tsx envia)
const filterMap: Record<string, "Novo" | "Usado" | undefined> = {
  Todos: undefined,
  "Livros Novos": "Novo",
  "Livros Usados": "Usado",
};

const FilteredBookList: React.FC<FilteredBookListProps> = ({
  initialBooks,
}) => {
  const router = useRouter(); // Hook para mudar a rota
  const searchParams = useSearchParams(); // Hook para ler a rota atual

  // Determina qual filtro está ativo lendo a URL (ex: ?condition=Novo)
  const currentCondition = searchParams.get("condition");
  const activeFilterKey =
    currentCondition === "Novo"
      ? "Livros Novos"
      : currentCondition === "Usado"
      ? "Livros Usados"
      : "Todos";

  // Função para mudar o filtro (e a URL)
  const handleFilterChange = (filterKey: keyof typeof filterMap) => {
    const conditionValue = filterMap[filterKey];
    const params = new URLSearchParams(searchParams.toString());

    if (conditionValue) {
      // Se for Novo/Usado, adiciona o parâmetro 'condition'
      params.set("condition", conditionValue);
    } else {
      // Se for 'Todos', remove o parâmetro 'condition'
      params.delete("condition");
    }

    // 🚨 ATUALIZA A URL: Isso força o Server Component (page.tsx) a buscar de novo no Firebase
    router.push(`/?${params.toString()}`);
  };

  const buttons = ["Todos", "Livros Novos", "Livros Usados"];

  return (
    <div>
      {/* Botões de Filtro */}
      <div className="mb-6 flex space-x-4">
        {buttons.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter as keyof typeof filterMap)}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
              activeFilterKey === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Renderiza a lista de livros que JÁ VEM FILTRADA do Servidor */}
      <BookList books={initialBooks} />
    </div>
  );
};

export default FilteredBookList;
