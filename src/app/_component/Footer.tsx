// src/app/_component/Footer.tsx
import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react"; // Ícones úteis

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Footer de largura total, fixo na parte inferior da tela
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-12 pt-10 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              Educa Vitrine+
            </h3>
            <p className="text-sm text-gray-400">
              Conectando leitores a grandes obras, oferecendo livros novos e
              usados com qualidade e preço justo.
            </p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Navegação</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-blue-400 transition-colors"
                >
                  Meu Carrinho
                </Link>
              </li>
              {/* Adicionar a página de política quando criada */}
              <li>
                <Link
                  href="/policy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                <a
                  href="mailto:contato@livrariaonline.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  contato@educavitrinemais.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                <span>+55 (21) 98732-3010</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>Rio de Janeiro, RJ - Brasil</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais / WhatsApp (usando o link de FAB) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Siga-nos</h4>
            <a
              href="https://wa.me/5521987323010?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20os%20livros%20que%20vi%20na%20livraria%20online."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 px-4 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
            >
              Atendimento WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 text-center text-sm text-gray-400">
          &copy; {currentYear} Livraria Online. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
