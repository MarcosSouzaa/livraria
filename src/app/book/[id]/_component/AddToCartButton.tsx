// src/app/book/[id]/_component/AddToCartButton.tsx (AJUSTADO)
"use client";

import React, { useState } from "react";
import { IBook } from "../../../../../libs/domain/book/Book";

interface AddToCartButtonProps {
  book: IBook;
  // 🚨 CORREÇÃO: Adicione a nova prop de função que será chamada ao clicar
  onAddToCart: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  book,
  onAddToCart,
}) => {
  // Você pode manter o estado local para feedback visual aqui, se tiver:
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleClick = () => {
    // 1. Chama a função passada pelo pai (BookDetailClient)
    onAddToCart();

    // 2. Lógica de feedback visual (opcional)
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  // O botão deve estar desabilitado se não houver estoque
  const isDisabled = !book.stock || book.stock <= 0;

  return (
    <div className="relative">
      <button
        onClick={handleClick} // 🚨 Chama o novo handler
        disabled={isDisabled}
        className={`w-full py-3 rounded-lg font-bold transition-colors duration-300 ${
          isDisabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isDisabled ? "Esgotado" : "Adicionar ao Carrinho"}
      </button>

      {/* Mensagem de sucesso (opcional) */}
      {showSuccessMessage && (
        <div className="absolute top-full mt-2 w-full text-center p-2 bg-green-500 text-white rounded-lg shadow-lg">
          Adicionado ao carrinho!
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
