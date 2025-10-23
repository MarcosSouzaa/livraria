// src/app/provider/CartProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { IBook } from "../../../libs/domain/book/Book";
import { CartItem, ICartItem } from "../../../libs/domain/cart/CartItem";

// ----------------------------------------------------------------------
// 1. Tipagem do Contexto (O Contrato que o CartProvider oferece)
// ----------------------------------------------------------------------

interface ICartContext {
  cartItems: ICartItem[];
  subtotal: number;
  totalItems: number;
  addItem: (book: IBook, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
}

// ----------------------------------------------------------------------
// 2. Criação do Contexto
// ----------------------------------------------------------------------

// Inicializamos com valores padrão que correspondem à tipagem
const defaultContextValue: ICartContext = {
  cartItems: [],
  subtotal: 0,
  totalItems: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<ICartContext>(defaultContextValue);

// Hook personalizado para fácil consumo do contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

// ----------------------------------------------------------------------
// 3. O Componente Provedor (A lógica do carrinho)
// ----------------------------------------------------------------------

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Estado que guarda a lista de itens no carrinho
  const [items, setItems] = useState<ICartItem[]>([]);

  // Lógica de Domínio: Adicionar um item ao carrinho
  const addItem = useCallback((book: IBook, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.book.id === book.id
      );

      if (existingItemIndex > -1) {
        // Se o item JÁ EXISTE: Aumenta a quantidade
        const updatedItems = [...currentItems];
        const existingCartItem = new CartItem(
          updatedItems[existingItemIndex].book,
          updatedItems[existingItemIndex].quantity
        );

        try {
          existingCartItem.increaseQuantity(quantity);
        } catch (error) {
          // Tratamento de erro de estoque (se implementado)
          console.error(error);
          return currentItems;
        }

        updatedItems[existingItemIndex] = existingCartItem;
        return updatedItems;
      } else {
        // Se o item NÃO EXISTE: Adiciona um novo
        const newCartItem = new CartItem(book, quantity);
        return [...currentItems, newCartItem];
      }
    });
  }, []);

  // Lógica de Domínio: Remover um item do carrinho
  const removeItem = useCallback((bookId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.book.id !== bookId)
    );
  }, []);

  // Lógica de Domínio: Atualizar a quantidade de um item
  const updateQuantity = useCallback((bookId: string, newQuantity: number) => {
    setItems((currentItems) => {
      const updatedItems = currentItems
        .map((item) => {
          if (item.book.id === bookId) {
            // Se a nova quantidade for zero ou menos, remove o item
            if (newQuantity <= 0) return null;

            // Cria uma nova instância da classe para garantir a lógica de domínio (stock check)
            const updatedCartItem = new CartItem(item.book, newQuantity);

            // Regra de Negócio: Não deixar a quantidade ultrapassar o estoque
            if (updatedCartItem.quantity > updatedCartItem.book.stock) {
              updatedCartItem.quantity = updatedCartItem.book.stock; // Limita ao estoque
            }

            // Recalcula o total dentro do construtor/classe
            return updatedCartItem;
          }
          return item;
        })
        .filter((item) => item !== null) as ICartItem[];

      return updatedItems;
    });
  }, []);

  // Lógica de Domínio: Limpar o carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Lógica de Negócio: Calculando o subtotal e total de itens (memoização)
  const contextValue = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      cartItems: items,
      subtotal,
      totalItems,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items, addItem, removeItem, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
