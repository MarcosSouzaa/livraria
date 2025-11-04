// src/service/BookService.ts (REVISADO)

import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { IBook } from "../libs/domain/book/Book";

/**
 * Service Layer para operações de Livros, conectado ao Firestore.
 */
export class BookService {
  private readonly collectionName = "books";

  /**
   * Busca todos os livros da coleção 'books' no Firestore.
   * @returns Uma Promise que resolve para um array de IBook.
   */
  async getAllBooks(): Promise<IBook[]> {
    return this.getFilteredBooks(undefined, undefined);
  }

  /**
   * Busca livros com filtros opcionais de pesquisa e condição.
   */
  async getFilteredBooks(
    searchTerm?: string,
    condition?: string // Recebe 'Novo' ou 'Usado' da URL
  ): Promise<IBook[]> {
    try {
      // Array para armazenar todas as cláusulas where e order.
      const filters = [];

      // 1. FILTRO DE CONDIÇÃO (Novo/Usado)
      // Se a URL contém ?condition=Novo, este filtro será aplicado.
      if (condition && (condition === "Novo" || condition === "Usado")) {
        // A string deve ser idêntica ao valor no Firestore (case-sensitive)
        filters.push(where("condition", "==", condition));
      }

      // 2. FILTRO DE PESQUISA POR PREFIXO (no campo 'title')
      /*
      if (searchTerm && searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        // Cláusulas where para busca por prefixo (exige índice no Firestore)
        filters.push(where("title", ">=", term));
        filters.push(where("title", "<=", term + "\uf8ff"));
        // filters.push(orderBy("title")); // Opcional, mas recomendado para buscas de prefixo
      }
      */

      // 3. Constrói a consulta usando todos os filtros
      // Se 'filters' estiver vazio, ele retorna todos os documentos (booksQuery = collection(db, this.collectionName))
      const booksQuery = query(collection(db, this.collectionName), ...filters);

      // 4. EXECUTA A CONSULTA
      const bookSnapshot = await getDocs(booksQuery);

      // 5. MAPEIA OS RESULTADOS
      const bookList = bookSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          condition: data.condition,
          price: data.price,
          description: data.description,
          stock: data.stock,
          coverImageUrl: data.coverImageUrl,
        } as IBook;
      });

      return bookList;
    } catch (error) {
      console.error("Erro ao buscar livros filtrados do Firestore:", error);
      // Retornamos um array vazio para não quebrar o frontend
      return [];
    }
  }

  /**
   * Busca um livro pelo seu ID (ID do documento no Firestore).
   */
  async getBookById(id: string): Promise<IBook | null> {
    try {
      const bookRef = doc(db, this.collectionName, id);
      const bookSnap = await getDoc(bookRef);

      if (bookSnap.exists()) {
        const data = bookSnap.data();
        return {
          id: bookSnap.id,
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          condition: data.condition,
          price: data.price,
          description: data.description,
          stock: data.stock,
          coverImageUrl: data.coverImageUrl,
        } as IBook;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Erro ao buscar livro com ID ${id}:`, error);
      return null;
    }
  }
}

// 🚨 EXPORTAÇÃO SINGLETON (DEPOIS DA CLASSE)
export const bookService = new BookService();
