/*Vamos criar um service que, por enquanto, apenas retorna os dados mockados, simulando o acesso
 ao banco de dados (que será o Firebase em breve). */
// service/BookService.ts

import { IBook } from "../libs/domain/book/Book";
import { mockBooks } from "../libs/utils/mockBooks";

/**
 * Interface que define o "Contrato" do nosso BookService.
 */
interface IBookService {
  getAllBooks(): Promise<IBook[]>;
  getBookById(id: string): Promise<IBook | null>;
}

/**
 * Implementação do Serviço de Livros.
 * Por enquanto, simula a comunicação com um banco de dados usando dados mockados.
 */
export class BookService implements IBookService {
  /**
   * Retorna todos os livros.
   * Simula um pequeno delay para imitar uma chamada de rede.
   */
  async getAllBooks(): Promise<IBook[]> {
    // Simulando a latência do DB/API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Em um mundo real, aqui seria: return db.collection('books').get();
    return mockBooks;
  }

  /**
   * Retorna um livro específico pelo ID.
   */
  async getBookById(id: string): Promise<IBook | null> {
    // Simulando a latência
    await new Promise((resolve) => setTimeout(resolve, 300));

    const book = mockBooks.find((b) => b.id === id);

    // Retorna o livro ou null se não for encontrado
    return book || null;
  }

  // Futuramente, teremos: saveBook, deleteBook, etc.
}

// Exportamos uma instância para ser facilmente importada (Singleton)
export const bookService = new BookService();
