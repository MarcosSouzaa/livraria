/*Para começarmos a testar o frontend sem o banco de dados (por enquanto),
 vamos criar um array de livros mockados (de mentira)  */
// libs/utils/mockBooks.ts

import { IBook } from "../domain/book/Book";

export const mockBooks: IBook[] = [
  {
    id: "a1b2c3d4",
    title: "Arquitetura Limpa",
    author: "Robert C. Martin",
    isbn: "978-8550804677",
    condition: "Novo",
    price: 99.9,
    description: "Um guia sobre a arte da arquitetura de software.",
    stock: 15,
    coverImageUrl: "/images/clean_arch.jpg", // Vamos usar uma imagem mock
  },
  {
    id: "e5f6g7h8",
    title: "Padrões de Projeto",
    author: "Gang of Four",
    isbn: "978-8573038186",
    condition: "Usado",
    price: 120.5,
    description: "Soluções reutilizáveis para problemas comuns de software.",
    stock: 5,
    coverImageUrl: "/images/design_patterns.jpg",
  },
  // Você pode adicionar mais aqui!
];
