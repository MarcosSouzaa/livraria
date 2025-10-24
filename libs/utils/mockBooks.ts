/*Para começarmos a testar o frontend sem o banco de dados (por enquanto),
 vamos criar um array de livros mockados (de mentira)  */
// libs/utils/mockBooks.ts

import { IBook } from "../domain/book/Book";

export const mockBooks: IBook[] = [
  {
    id: "a1b2c3d4",
    title: "ANos Finais ",
    author: "Robert C. Martin",
    isbn: "978-8550804677",
    condition: "Novo",
    price: 99.9,
    description: "Volume 1 - 7º no",
    stock: 15,
    coverImageUrl: "/images/clean_arch.jpg", // Vamos usar uma imagem mock
  },
  {
    id: "e5f6g7h8",
    title: "Ser Protagonista",
    author: "Fulano de Tal",
    isbn: "978-8573038186",
    condition: "Usado",
    price: 120.5,
    description: "A voz da juventude - Língua Portuguesa",
    stock: 5,
    coverImageUrl: "/images/design_patterns.jpg",
  },
  // Você pode adicionar mais aqui!
  {
    id: "e5f6g7h9",
    title: "Take Over",
    author: "Denise Santos",
    isbn: "978-8573038186",
    condition: "Usado",
    price: 111.5,
    description: "Manual do Professor",
    stock: 5,
    coverImageUrl: "/images/take over 1.jpg",
  },
  {
    id: "e5f6g7h6",
    title: "Oxford Practice Grammar",
    author: "John Eastwood",
    isbn: "978-8573038186",
    condition: "Novo",
    price: 112.5,
    description: "New Edition - Now with tests",
    stock: 5,
    coverImageUrl: "/images/Oxford.jpg",
  },
];
