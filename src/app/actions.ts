// src/app/actions.ts
"use server";

import { IBook } from "../../libs/domain/book/Book";
import {
  PaymentMethod,
  ShippingMethod,
} from "./cart/_component/CheckoutOptions";
import { db as firestore } from "../service/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  runTransaction,
  doc, // 🚨 REMOVIDO: FieldValue não é necessário aqui
  CollectionReference,
} from "firebase/firestore";

// Interface para o item do carrinho que inclui a quantidade (garante que item.quantity existe)
interface IBookWithQuantity extends IBook {
  quantity: number;
}

// Interface para o documento do Livro no Firestore (para tipagem)
interface BookDoc {
  stock: number;
  title: string;
  price: number;
}
// ... (restante das interfaces OrderItem e OrderData)
interface OrderItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  status: "Pending" | "Completed" | "Cancelled";
  createdAt: ReturnType<typeof serverTimestamp>; // Tipagem correta
}

// 🚨 CORREÇÃO PRINCIPAL: Cria uma referência tipada da Coleção de Livros
const booksCollection = collection(
  firestore,
  "books"
) as CollectionReference<BookDoc>;

// Função Server Action que processa o pedido
export async function processOrder(
  cartItems: IBookWithQuantity[],
  cartTotal: number,
  paymentMethod: PaymentMethod,
  shippingMethod: ShippingMethod
) {
  // ... (RESTANTE DO CÓDIGO PERFEITO)
}
