// src/app/about/page.tsx (ou sua rota escolhida)
import React from "react";

export default function AboutPage() {
  return (
    <main className="container mx-auto p-4 md:p-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Sobre a Livraria Online</h1>

      <div className="max-w-3xl text-lg text-gray-700 dark:text-gray-300 space-y-4">
        <p>
          Nossa livraria nasceu com o objetivo de conectar leitores a grandes
          obras, oferecendo tanto livros novos quanto usados, garantindo preços
          justos e sustentabilidade.
        </p>
        <p>
          Acreditamos no poder da leitura e na importância de dar uma segunda
          vida aos livros, tornando o conhecimento acessível a todos. Todos os
          livros usados passam por uma rigorosa curadoria para garantir a melhor
          qualidade.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Nossos Serviços:</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Venda de livros novos e usados.</li>
          <li>Pagamento facilitado via PIX e Cartão (Crédito/Débito).</li>
          <li>Envio seguro via Correios para todo o Brasil.</li>
          <li>Atendimento personalizado via WhatsApp.</li>
        </ul>
      </div>
    </main>
  );
}
