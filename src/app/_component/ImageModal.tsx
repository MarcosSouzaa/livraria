// src/app/_component/ImageModal.tsx
"use client";

import React from "react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void; // Função para fechar o modal
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Fecha o modal ao clicar fora da imagem
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()} // Evita que o clique na imagem feche o modal
      >
        <Image
          src={src}
          alt={alt}
          fill={true}
          style={{ objectFit: "contain" }} // Garante que a imagem inteira seja visível
          className="rounded-lg shadow-2xl"
        />
        <button
          onClick={(e) => {
            // 🚨 CRÍTICO: Novo código de clique
            e.stopPropagation(); // Garante que o clique no X não afete o link pai do BookCard
            onClose();
          }}
          className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
