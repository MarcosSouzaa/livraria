// src/app/page.tsx (CORREÇÃO FINAL DE SINTAXE E LÓGICA)

import { BookService } from "../service/BookService";
import { IBook } from "../../libs/domain/book/Book";
import FilteredBookList from "./_component/FilteredBookList";
// Importar React, se não for automático
import React from "react";

interface HomeProps {
  searchParams: {
    search?: string;
    condition?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const bookServiceInstance = new BookService();

  // 🚨 CORREÇÃO DEFINITIVA: Força a resolução da Promise se o Next.js a estiver passando assim.
  // Esta linha deve resolver o erro "searchParams is a Promise".
  // Desestruturamos DEPOIS da garantia de resolução.
  const { search: searchTerm, condition: conditionFilter } =
    searchParams instanceof Promise
      ? await searchParams // Se for uma Promise, esperamos por ela
      : searchParams; // Caso contrário, usamos diretamente

  // O Next.js recomenda usar React.use() para Promises em Server Components, mas
  // o bloco acima tenta resolver o problema com o 'await' que seu componente já tem.

  // 1. Buscando os dados do Service Layer COM os parâmetros
  const booksData: IBook[] = await bookServiceInstance.getFilteredBooks(
    searchTerm,
    conditionFilter
  );

  return (
    <main className="min-h-screen p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Livros</h1>
      <FilteredBookList initialBooks={booksData} />
    </main>
  );
}
