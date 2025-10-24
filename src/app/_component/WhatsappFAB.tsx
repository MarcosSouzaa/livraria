// src/app/_component/WhatsappFAB.tsx
"use client";

import React from "react";
import { MessageSquareText } from "lucide-react"; // Ícone do WhatsApp (se não tiver lucide, use 💬)

const WHATSAPP_NUMBER = "5521987323010";
const DEFAULT_MESSAGE =
  "Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20os%20livros%20que%20vi%20na%20livraria%20online.";

const WhatsappFAB: React.FC = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 shadow-lg transition-transform duration-300 hover:scale-105"
      aria-label="Fale Conosco pelo WhatsApp"
    >
      <MessageSquareText className="w-8 h-8 text-white" />
    </a>
  );
};

export default WhatsappFAB;
