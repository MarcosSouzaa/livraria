// libs/domain/cart/CartItem.ts

import { IBook } from "../book/Book";

export interface ICartItem {
  book: IBook; // O objeto livro completo
  quantity: number; // A quantidade que o cliente quer comprar
  totalPrice: number; // Preço total (quantity * book.price)
}

/**
 * Classe de Domínio para manipular a lógica de um Item no Carrinho.
 */
export class CartItem implements ICartItem {
  book: IBook;
  quantity: number;
  totalPrice: number;

  constructor(book: IBook, quantity: number = 1) {
    this.book = book;
    this.quantity = quantity;
    this.totalPrice = this.calculateTotalPrice();
  }

  // Lógica de Domínio: Recalcula o preço total
  private calculateTotalPrice(): number {
    return this.book.price * this.quantity;
  }

  // Método de Domínio: Aumenta a quantidade
  public increaseQuantity(amount: number = 1): void {
    if (this.quantity + amount <= this.book.stock) {
      // Regra de negócio: não exceder estoque
      this.quantity += amount;
      this.totalPrice = this.calculateTotalPrice();
    } else {
      console.warn("Estoque insuficiente.");
      // Poderíamos lançar um erro ou avisar o usuário no Frontend
    }
  }

  // Método de Domínio: Formata o total
  public getFormattedTotal(): string {
    return `R$ ${this.totalPrice.toFixed(2).replace(".", ",")}`;
  }
}
