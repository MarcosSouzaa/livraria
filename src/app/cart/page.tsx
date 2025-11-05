// src/app/cart/page.tsx
"use client";

import React from "react";
import CartClient from "./CartClient";
// Remova useCart, CartItem, Link e Image daqui, pois eles são usados APENAS no CartClient.

// Componente de Página/Cliente para gerenciar a página de Carrinho
export default function CartPage() {
  // A página apenas renderiza o cliente
  return <CartClient />;
}
// NÃO DEVE HAVER MAIS NADA ABAIXO DESTA CHAVE FINAL
