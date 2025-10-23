// Configurando o Domínio do Book
/**
 * Interface que define a estrutura de dados (o Contrato)
 * da nossa entidade Livro.
 */
export interface IBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  condition: string;
  price: number;
  description: string;
  stock: number; // Quantidade em estoque
  coverImageUrl: string; //URL da imagem de capa
  // Adicione outras propriedades (ex: anoPublicacao) conforme precisar.
}

/**
 * Classe de Domínio do Livro.
 * Ela implementa a interface e pode conter métodos de Regra de Negócio.
 * 
 * Você já está fazendo a atribuição no construtor. Para satisfazer o TypeScript
 *  no modo Strict, você pode simplesmente declarar as propriedades com o operador
 *  ! (Non-null Assertion Operator), que diz ao TS: "Confie em mim, ela será inicializada
 *  no construtor."

Corrija Book.ts desta forma (preste atenção ao ! após o nome da propriedade):
 */
export class Book implements IBook {
  id!: string;
  title!: string;
  author!: string;
  isbn!: string;
  condition!: string; //novo ou usado
  price!: number;
  description!: string;
  stock!: number;
  coverImageUrl!: string;

  constructor(data: IBook) {
    // Garantimos que todos os dados sejam atribuídos
    Object.assign(this, data);
  }

  /**
   * Método de Regra de Negócio: Verifica se o livro está disponível.
   */
  public isAvailable(): boolean {
    return this.stock > 0;
  }

  /**
   * Método de Apresentação/Utilidade: Formata o preço para exibição.
   */
  public getFormattedPrice(): string {
    return `R$ ${this.price.toFixed(2).replace(".", ",")}`;
  }
}
