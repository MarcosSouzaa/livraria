// src/app/provider/CartProvider.tsx (COMPLETO E REVISADO)
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { IBook } from "../../../libs/domain/book/Book";
import { CartItem, ICartItem } from "../../../libs/domain/cart/CartItem";

const CART_STORAGE_KEY = "livraria-online-cart";

// ----------------------------------------------------------------------
// 1. Tipagem do Contexto
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

// 🚨 CORREÇÃO DE TIPAGEM: Inicialização COMPLETA.
const defaultContextValue: ICartContext = {
  cartItems: [],
  subtotal: 0,
  totalItems: 0,
  // 🚨 Propriedades de função precisam ser inicializadas
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<ICartContext>(defaultContextValue);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // Isso é útil para depuração
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

// ----------------------------------------------------------------------
// 3. O Componente Provedor (Com Persistência)
// ----------------------------------------------------------------------

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 🚨 Persistência 1: Inicializa lendo do localStorage
  const [items, setItems] = useState<ICartItem[]>(() => {
    // Garante que só roda no navegador (Client-side)
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const parsedItems = JSON.parse(savedCart);
          // Mapeia de volta para instâncias de CartItem
          return parsedItems.map(
            (itemData: { book: IBook; quantity: number }) =>
              new CartItem(itemData.book, itemData.quantity)
          );
        } catch (e) {
          console.error("Erro ao carregar carrinho do localStorage", e);
          return [];
        }
      }
    }
    return [];
  });

  // 🚨 Persistência 2: Salva no localStorage sempre que 'items' muda
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (items.length > 0) {
        // Salva apenas os dados necessários (book e quantity)
        const itemsToSave = items.map((item) => ({
          book: item.book,
          quantity: item.quantity,
        }));
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itemsToSave));
      } else {
        // Se estiver vazio, limpa o armazenamento
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, [items]);

  // --- Lógica de Domínio (addItem, removeItem, updateQuantity, clearCart) ---

  // Adicionar um item ao carrinho
  const addItem = useCallback((book: IBook, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.book.id === book.id
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        const existingCartItem = new CartItem(
          updatedItems[existingItemIndex].book,
          updatedItems[existingItemIndex].quantity
        );
        try {
          existingCartItem.increaseQuantity(quantity);
        } catch (error) {
          console.error(error);
          return currentItems;
        }
        updatedItems[existingItemIndex] = existingCartItem;
        return updatedItems;
      } else {
        const newCartItem = new CartItem(book, quantity);
        return [...currentItems, newCartItem];
      }
    });
  }, []);

  // Remover um item do carrinho
  const removeItem = useCallback((bookId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.book.id !== bookId)
    );
  }, []);

  // Atualizar a quantidade de um item
  const updateQuantity = useCallback((bookId: string, newQuantity: number) => {
    setItems((currentItems) => {
      const updatedItems = currentItems
        .map((item) => {
          if (item.book.id === bookId) {
            if (newQuantity <= 0) return null;
            const updatedCartItem = new CartItem(item.book, newQuantity);
            // Regra de Negócio: Limita ao estoque
            if (updatedCartItem.quantity > updatedCartItem.book.stock) {
              updatedCartItem.quantity = updatedCartItem.book.stock;
            }
            return updatedCartItem;
          }
          return item;
        })
        .filter((item) => item !== null) as ICartItem[];

      return updatedItems;
    });
  }, []);

  // Limpar o carrinho
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
