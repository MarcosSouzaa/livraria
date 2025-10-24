// src/app/book/[id]/_component/AddToCartButton.tsx
"use client";

import React from "react";
import { useCart } from "../../../provider/CartProvider";
// Ajuste o caminho para a sua estrutura correta (libs/domain/book/Book)
import { IBook } from "../../../../../libs/domain/book/Book";

interface AddToCartButtonProps {
  book: IBook;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ book }) => {
  const { addItem, cartItems } = useCart();

  // Verifica se o livro já está no carrinho
  const currentItem = cartItems.find((item) => item.book.id === book.id);
  const isInStock = book.stock > 0;

  // Verifica se a quantidade máxima (estoque) foi atingida
  const isMaxQuantity = currentItem
    ? currentItem.quantity >= book.stock
    : false;

  const handleAddToCart = () => {
    if (isInStock) {
      addItem(book);
    }
  };

  if (!isInStock) {
    return (
      <button
        disabled
        className="py-3 px-8 bg-gray-400 text-white font-bold rounded-lg cursor-not-allowed"
      >
        Esgotado
      </button>
    );
  }

  if (isMaxQuantity) {
    return (
      <button
        disabled
        className="py-3 px-8 bg-yellow-600 text-white font-bold rounded-lg cursor-not-allowed"
      >
        Máximo no Carrinho
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="py-3 px-8 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
    >
      Adicionar ao Carrinho
    </button>
  );
};

export default AddToCartButton;
