// /src/app/_component/BookCard.tsx (REVISADO)
"use client";

import React from "react";
import Image from "next/image";
// 🚨 Link não é mais o wrapper principal, pois queremos evitar a navegação direta,
// mas pode ser útil para SEO/Acessibilidade. Vamos usar o <div> principal.
import { Book, IBook } from "../../../libs/domain/book/Book";

// 🚨 MUDANÇA NAS PROPS: Recebe o livro e uma função para o clique de detalhes.
interface BookCardProps {
  bookData: IBook; // A função que o componente PAI (BookList) passa para abrir o modal
  onDetailsClick: (e: React.MouseEvent) => void;
}

const BookCard: React.FC<BookCardProps> = ({ bookData, onDetailsClick }) => {
  // Instanciando a CLASSE de domínio
  const book = new Book(bookData); // Handler para o clique no Card (abre o modal de detalhes)

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne qualquer navegação padrão de Link (se fosse um Link)
    e.stopPropagation(); // Garante que o evento não propague para outros elementos pai // Chama a função que o pai (BookList) passou para definir o 'selectedBook'
    onDetailsClick(e);
  };

  // O botão Adicionar no Card deve ter o mesmo comportamento: abrir o modal.
  const handleAddToCartClick = (e: React.MouseEvent) => {
    // CRÍTICO: Previne que o clique no botão dispare a navegação
    e.preventDefault();
    e.stopPropagation();
    onDetailsClick(e);
  };

  return (
    // 🚨 NOVO: O wrapper principal é agora um <div> que gerencia o clique
    <div
      onClick={handleCardClick} // 🚨 Clique em qualquer lugar do Card abre o modal
      className="bg-gray-800 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
    >
            {/* w-full e h-64 definem o tamanho */}     {" "}
      <div className="relative w-full h-64 bg-gray-200 cursor-zoom-in">
               {" "}
        <Image
          src={book.coverImageUrl}
          alt={`Capa do livro: ${book.title}`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
             {" "}
      </div>
           {" "}
      <div className="p-4">
                <h3 className="text-xl font-semibold truncate">{book.title}</h3>
                <p className="text-gray-600 italic mb-2">{book.author}</p>     
          {/* Lógica de Condição (Novo/Usado) */}       {" "}
        <p className="text-sm text-gray-500 mt-1">
                    Condição:{" "}
          <span className="font-semibold">{book.condition}</span>       {" "}
        </p>
                {/* Preço */}       {" "}
        <p className="text-2xl font-bold text-green-600 mb-2 mt-2">
                    {book.getFormattedPrice()}       {" "}
        </p>
                {/* Tag de Estoque */}       {" "}
        <div className="relative inline-block">
                   {" "}
          <span
            className={`px-2 py-1 text-sm rounded ${
              book.isAvailable()
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } mb-3 inline-block cursor-pointer`}
            title={
              book.isAvailable()
                ? `Temos ${book.stock} unidades em estoque.`
                : "Este livro está esgotado no momento."
            }
          >
                        {book.isAvailable() ? "Em Estoque" : "Esgotado"}       
             {" "}
          </span>
                 {" "}
        </div>
                {/* Botão Adicionar ao Carrinho */}       {" "}
        <button
          onClick={handleAddToCartClick} // 🚨 Agora abre o modal
          disabled={!book.isAvailable()}
          className={`w-full mt-3 py-2 rounded font-bold transition-colors duration-300 
                ${
            book.isAvailable()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
                   {" "}
          {book.isAvailable() ? "Adicionar ao Carrinho" : "Ver Detalhes"}       {" "}
        </button>
             {" "}
      </div>
            {/* 🚨 O MODAL FOI REMOVIDO DAQUI */}   {" "}
    </div>
  );
};

export default BookCard;
