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
  doc,
  CollectionReference,
} from "firebase/firestore";

// Interface para o item do carrinho que inclui a quantidade (garante que item.quantity existe)
export interface IBookWithQuantity extends IBook {
  quantity: number;
}

// Interface para o documento do Livro no Firestore (para tipagem)
interface BookDoc {
  stock: number;
  title: string;
  price: number;
}

// Defina a interface para os dados que serão salvos no array de itens do pedido
interface OrderItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

// Interface para a estrutura completa do Pedido
interface OrderData {
  items: OrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  status: "Pending" | "Completed" | "Cancelled";
  createdAt: ReturnType<typeof serverTimestamp>;
}

// Interface para o retorno da Server Action
type OrderResult =
  | { success: true; message: string; orderId: string }
  | { success: false; message: string };

// Cria uma referência tipada da Coleção de Livros
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
): Promise<OrderResult> {
  // 1. Verificações de Condições (LÓGICA FALTANTE)
  if (!paymentMethod || !shippingMethod) {
    return {
      success: false,
      message: "Método de pagamento ou entrega não selecionado.",
    };
  }

  if (cartItems.length === 0) {
    return { success: false, message: "O carrinho está vazio." };
  }

  // 2. Mapeia os itens do carrinho para o formato de itens do pedido (LÓGICA FALTANTE)
  const orderItems: OrderItem[] = cartItems.map((item) => ({
    bookId: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  // Cria o objeto de dados do pedido (LÓGICA FALTANTE)
  const orderData: OrderData = {
    items: orderItems,
    total: cartTotal,
    paymentMethod: paymentMethod,
    shippingMethod: shippingMethod,
    status: "Pending",
    createdAt: serverTimestamp(),
  };

  try {
    // 3. SALVAR O PEDIDO NO FIRESTORE (LÓGICA FALTANTE)
    const ordersCollection = collection(firestore, "orders");
    const newOrderRef = await addDoc(ordersCollection, orderData);

    // 4. ATUALIZAR O ESTOQUE NO FIRESTORE (Transação atômica) (LÓGICA FALTANTE)
    await runTransaction(firestore, async (transaction) => {
      for (const item of orderItems) {
        const bookRef = doc(booksCollection, item.bookId);
        const bookSnap = await transaction.get(bookRef);

        if (!bookSnap.exists()) {
          throw new Error(`Livro com ID ${item.bookId} não encontrado.`);
        }

        const currentStock = bookSnap.data()?.stock || 0;
        const newStock = currentStock - item.quantity;

        if (newStock < 0) {
          throw new Error(`Estoque insuficiente para o livro: ${item.title}`);
        }

        transaction.update(bookRef, { stock: newStock });
      }
    });

    // 5. Retorno de Sucesso (LÓGICA FALTANTE)
    return {
      success: true,
      message: "Pedido criado e estoque atualizado com sucesso!",
      orderId: newOrderRef.id,
    };
  } catch (error) {
    // 6. Retorno de Erro (LÓGICA FALTANTE)
    console.error("Erro ao processar o pedido:", error);
    return {
      success: false,
      message: `Erro ao finalizar o pedido: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
    };
  }
}
