// src/app/book/[id]/page.tsx   . ../_component/AddToCartButton";

import React from "react";
import { BookService } from "../../../../service/BookService";
import { IBook } from "../../../../libs/domain/book/Book";
import AddToCartButton from "./_component/AddToCartButton";

interface BookDetailPageProps {
  params: {
    id: string; // O ID do livro é esperado aqui
  };
}

// Seu componente de Detalhes do Livro
export default async function BookDetailPage({ params }: BookDetailPageProps) {
  // 🚨 CORREÇÃO DE SINTAXE: Desestruturação segura para evitar o erro de Promise do Next.js
  // Extrai o ID do livro.
  const { id } =
    params instanceof Promise
      ? await params // Se for uma Promise (bug do Next.js), aguarda
      : params; // Caso contrário, usa diretamente

  // 1. Busca o livro usando o BookService
  // Usa o Singleton importado
  const bookServiceInstance = new BookService();

  // Agora 'id' é uma string e não undefined, evitando o TypeError
  const bookData = await bookServiceInstance.getBookById(id);

  // Se o livro não for encontrado, retorna algo
  if (!bookData) {
    return <div className="p-10 text-xl">Livro não encontrado.</div>;
  }

  // ... O restante da sua renderização ...
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Seus detalhes da página, usando bookData */}
      <h1 className="text-4xl font-bold mb-4">{bookData.title}</h1>
      {/* O AddToCartButton precisa do bookData */}
      <AddToCartButton book={bookData} />
    </div>
  );
}
