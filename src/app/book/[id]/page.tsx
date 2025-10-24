// src/app/book/[id]/page.tsx

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Importe o BookService (caminho para a pasta service na raiz)
import { BookService } from "../../../../service/BookService";
// Importe o Client Component para adicionar ao carrinho
import AddToCartButton from "./_component/AddToCartButton";
// Importe a interface IBook para garantir o tipo correto
import { IBook } from "../../../../libs/domain/book/Book";

// Definição da interface de Props, onde o Next.js injeta os parâmetros da rota
interface BookDetailPageProps {
  params: {
    id: string; // O ID do livro capturado da URL (/book/[id])
  };
}

// Componente de Detalhes do Livro (Server Component)
export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const bookId = params.id;

  // 1. Busca o livro usando o BookService
  const bookService = new BookService();
  // Assume que o bookService retorna um objeto IBook ou uma CLASSE Book.
  const bookResult = await bookService.getBookById(bookId);

  // Se o livro não for encontrado (ID inválido), retorna 404
  if (!bookResult) {
    notFound();
  }

  // 🚨 CORREÇÃO 1: Conversão para "Plain Object"
  // Esta desestruturação garante que o objeto passado para o Client Component (AddToCartButton)
  // seja um objeto simples (IBook) e não uma instância de classe (Book), resolvendo o erro de Runtime.
  const plainBook: IBook = {
    id: bookResult.id,
    title: bookResult.title,
    author: bookResult.author,
    isbn: bookResult.isbn,
    condition: bookResult.condition,
    price: bookResult.price,
    description: bookResult.description,
    stock: bookResult.stock,
    coverImageUrl: bookResult.coverImageUrl,
  };

  return (
    <main className="container mx-auto p-4 md:p-10 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        {/* COLUNA ESQUERDA: Capa do Livro */}
        <div className="flex-shrink-0 lg:w-1/3">
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={plainBook.coverImageUrl}
              alt={`Capa de ${plainBook.title}`}
              fill={true}
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* COLUNA DIREITA: Detalhes e Ações */}
        <div className="flex-1 space-y-6 text-gray-900 dark:text-gray-200">
          {/* Informações Básicas */}
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            {plainBook.title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            **Por: {plainBook.author}**
          </p>
          <div className="text-lg space-y-1">
            <p>
              <strong>ISBN:</strong> {plainBook.isbn}
            </p>
            <p>
              <strong>Condição:</strong>{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {plainBook.condition}
              </span>
            </p>
            <p>
              <strong>Estoque:</strong> {plainBook.stock} unidades
            </p>
          </div>

          {/* Descrição */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Sinopse</h2>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
              {plainBook.description}
            </p>
          </div>

          {/* Preço e Ação */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <span className="text-4xl font-bold text-green-600 dark:text-green-400">
              R$ {plainBook.price.toFixed(2).replace(".", ",")}
            </span>

            {/* O BOTÃO é um Client Component para poder usar o useCart */}
            {/* 🚨 Passando o objeto simples corrigido */}
            <AddToCartButton book={plainBook} />
          </div>
        </div>
      </div>
    </main>
  );
}

// 🚨 CORREÇÃO 2: Removido o código incorreto de importação e exportação do Loading.
// O arquivo loading.tsx deve ser criado separadamente, se necessário.
