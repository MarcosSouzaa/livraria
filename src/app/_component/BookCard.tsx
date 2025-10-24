// /src/app/_component/BookCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image"; // Componente de imagem otimizado do Next.js
import Link from "next/link"; // Componente de link do Next.js
import { Book, IBook } from "../../../libs/domain/book/Book";
import { useCart } from "../provider/CartProvider"; // <-- NOVO: Importa o hook do carrinho
import BookDetailModal from "./BookDetailModal";

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book: bookData }) => {
  // NOVO: Acessa a função addItem do contexto do carrinho
  const { addItem } = useCart();

  // Instanciando a CLASSE de domínio para usar os métodos de negócio (ex: isAvailable)
  const book = new Book(bookData);

  // NOVO: Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //AUMENTA A IMAGEM NO CLICK
  const handleImageClick = (e: React.MouseEvent) => {
    // Aqui não precisamos mais de e.preventDefault() porque o modal agora é a experiência principal de clique.
    // MAS, como o botão "Adicionar" está DENTRO do <Link>, é mais seguro remover o evento de clique da imagem.
    // Vamos garantir que a navegação para a página de detalhes (Link) seja o comportamento padrão, e o modal
    //  só seja aberto se removermos o <Link> pai.
    // NOVO COMPORTAMENTO: Se clicar em QUALQUER lugar que não seja o botão Adicionar, VAI para a página de detalhes.
    // Se você quer que o CLIQUE NA IMAGEM ABRA O MODAL e o clique no texto VÁ PARA A PÁGINA:
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // NOVO: Handler para adicionar o livro ao carrinho
  const handleAddToCart = (e: React.MouseEvent) => {
    // CRÍTICO: Previne que o clique no botão dispare a navegação do Link pai
    e.preventDefault();
    e.stopPropagation(); // Opcional: Garante que o evento não propague para outros elementos

    if (book.isAvailable()) {
      // Chamando a lógica de negócio do CartProvider e passando o objeto de dados puros (IBook)
      addItem(bookData);
      // Feedback rápido para o usuário
      alert(`"${book.title}" adicionado ao carrinho!`);
    }
  };

  return (
    // Link para a página de detalhes (Link Pai)
    <Link
      href={`/book/${book.id}`}
      className="block border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group" // Adicione 'group' para estilos mais avançados, se necessário
    >
      {/* w-full e h-64 definem o tamanho */}
      <div className="relative w-full h-64 bg-gray-200 cursor-zoom-in">
        <Image
          src={book.coverImageUrl}
          alt={`Capa do livro: ${book.title}`}
          fill={true}
          style={{ objectFit: "cover" }} // Garante que a imagem preencha o espaço sem distorcer
          onClick={handleImageClick} //Clique para aumentar a imagem
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{book.title}</h3>
        <p className="text-gray-600 italic mb-2">{book.author}</p>

        {/* Lógica de Condição (Novo/Usado) */}
        <p className="text-sm text-gray-500 mt-1">
          Condição: <span className="font-semibold">{book.condition}</span>
        </p>

        {/* Preço */}
        <p className="text-2xl font-bold text-green-600 mb-2 mt-2">
          {book.getFormattedPrice()}
        </p>

        {/* NOVO: Tag de Estoque com Tooltip */}
        <div className="relative inline-block">
          {/* Contêiner para o tooltip */}
          <span
            className={`px-2 py-1 text-sm rounded ${
              book.isAvailable()
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } mb-3 inline-block cursor-pointer group-hover:block`} // cursor-pointer para indicar interatividade
            title={
              // <--- ATRIBUTO TITLE: O jeito mais simples de tooltip
              book.isAvailable()
                ? `Temos ${book.stock} unidades em estoque.`
                : "Este livro está esgotado no momento."
            }
          >
            {book.isAvailable() ? "Em Estoque" : "Esgotado"}
          </span>
          {/* Você pode construir um tooltip mais avançado com estado React se quiser,
              mas o atributo 'title' é o mais simples e acessível. */}
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <button
          onClick={handleAddToCart}
          disabled={!book.isAvailable()}
          className={`w-full mt-3 py-2 rounded font-bold transition-colors duration-300 
                ${
                  book.isAvailable()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
        >
          {book.isAvailable() ? "Adicionar ao Carrinho" : "Esgotado"}
        </button>
      </div>

      {/* NOVO: Renderiza o modal se isModalOpen for true */}
      {isModalOpen && (
        <BookDetailModal
          bookData={bookData} // Passamos o objeto puro
          onClose={() => setIsModalOpen(false)}
          // Reutilizamos a função addItem que já está no BookCard
          onAddToCart={() => {
            addItem(bookData);
            setIsModalOpen(false);
          }}
        />
      )}
    </Link>
  );
};

export default BookCard;
