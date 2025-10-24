import { bookService } from "../../service/BookService"; // Ajuste o caminho de importação conforme sua estrutura
import { IBook } from "../../libs/domain/book/Book";
import FilteredBookList from "./_component/FilteredBookList";
/**
 *  "../../libs/domain/book/Book";
 * Esta é uma Server Component (Componente de Servidor) do Next.js.
 * Ela pode ser assíncrona e buscar dados diretamente do seu Service Layer.
 * Isso é o que há de mais moderno no Next.js!
 */
export default async function Home() {
  // 1. Buscando os dados do Service Layer
  // Como estamos em um Server Component, não precisamos de hooks como 'useState' ou 'useEffect'.
  const booksData: IBook[] = await bookService.getAllBooks();

  // 2. Mapeando os dados brutos para nossas classes de Domínio (Opcional, mas boa prática)
  //const books = booksData.map((bookData) => new Book(bookData));

  return (
    <main className="min-h-screen p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Livros</h1>

      {/* 3. Passando a lista para um componente de apresentação */}
      <FilteredBookList initialBooks={booksData} />
    </main>
  );
}
