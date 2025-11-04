// src/app/cart/page.tsx (REVISADO - Conexão Checkout)
"use client";

import React from "react";
import { useCart } from "../provider/CartProvider";
import { CartItem } from "../../../libs/domain/cart/CartItem";
import Link from "next/link";
import Image from "next/image";

// Componente de Cliente para gerenciar a página de Carrinho
export default function CartPage() {
  // ... (Código do useCart e items) ...
  const { cartItems, subtotal, removeItem, updateQuantity } = useCart();
  // Nota: Mapear para new CartItem() aqui pode ser redundante se o CartProvider já retorna ICartItem (que tem totalPrice),
  // mas vamos manter o padrão que você usa.
  const items = cartItems.map((item) => new CartItem(item.book, item.quantity));

  // ... (Código para Carrinho Vazio) ...
  if (items.length === 0) {
    // ... (Seu código para carrinho vazio) ...
    return (
      <div className="container mx-auto p-4 md:p-10 min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-8">Seu Carrinho está Vazio</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Parece que você ainda não adicionou nenhum livro.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Seu Carrinho de Compras</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* COLUNA ESQUERDA: Itens do Carrinho */}
        <div className="lg:w-3/4 space-y-4">
          {items.map((item) => (
            <div
              key={item.book.id}
              className="flex items-center border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              {/* MINIATURA DA IMAGEM */}
              <div className="relative w-16 h-20 mr-4 flex-shrink-0">
                <Image
                  src={item.book.coverImageUrl}
                  alt={`Capa de ${item.book.title}`}
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>

              {/* Título, Autor e Condição */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/book/${item.book.id}`}
                  className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors truncate"
                >
                  {item.book.title}
                </Link>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Por: {item.book.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Condição: {item.book.condition}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Estoque: {item.book.stock}
                </p>
              </div>

              {/* Quantidade e Botões */}
              <div className="flex items-center space-x-3 mx-4 flex-shrink-0">
                <button
                  onClick={() =>
                    updateQuantity(item.book.id, item.quantity - 1)
                  }
                  className="bg-gray-300 dark:bg-gray-600 p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="font-medium w-6 text-center text-gray-900 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.book.id, item.quantity + 1)
                  }
                  className="bg-gray-300 dark:bg-gray-600 p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
                  disabled={item.quantity >= item.book.stock}
                >
                  +
                </button>
              </div>

              {/* Preço Total e Remover */}
              <div className="flex-shrink-0 text-right">
                <p className="text-lg font-bold text-green-700">
                  {item.getFormattedTotal()}
                </p>
                <button
                  onClick={() => removeItem(item.book.id)}
                  className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* COLUNA DIREITA: Resumo e Checkout */}
        <div className="lg:w-1/4 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Resumo do Pedido
          </h2>

          <div className="flex justify-between text-lg font-medium mb-4">
            <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
            <span className="text-green-700 dark:text-green-400">
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-sm text-white dark:text-gray-200 mb-6">
            O frete e os impostos serão calculados na próxima etapa.
          </p>

          {/* 🚨 CORREÇÃO PRINCIPAL AQUI: Substituindo <button> por <Link> */}
          <Link
            href="/checkout"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors block text-center"
          >
            Prosseguir para o Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
