// src/app/checkout/page.tsx (CORRIGIDO)
"use client";

import { useCart } from "../provider/CartProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // 🚨 Importe useEffect

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // 🚨 CORREÇÃO: Mova o redirecionamento para o useEffect
  useEffect(() => {
    // Verifica se o carrinho está vazio e a compra não está em processamento
    if (cartItems.length === 0 && !isProcessing) {
      // Isso garante que o redirecionamento ocorre APÓS a renderização
      router.push("/catalogo");
    }
  }, [cartItems.length, isProcessing, router]);
  // Dependências: Garante que roda se o carrinho esvaziar ou o processamento mudar

  // 1. Otimização: Renderiza uma tela de carregamento/redirecionamento
  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="p-10 text-center">
        <p>Carrinho vazio. Redirecionando para o catálogo...</p>
      </div>
    );
  }

  // ... (restante da sua função handleFinalizePurchase permanece o mesmo) ...
  const handleFinalizePurchase = () => {
    setIsProcessing(true);
    console.log("Processando pagamento e enviando ordem...");

    setTimeout(() => {
      clearCart();
      // Usamos '/catalogo' para coincidir com a lógica de redirecionamento no useEffect
      alert(`Compra finalizada com sucesso! Total: R$ ${subtotal.toFixed(2)}`);
      router.push("/catalogo");
    }, 1500);
  };

  // ... (O JSX de retorno da página CheckoutPage permanece o mesmo) ...
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* ... Conteúdo do Resumo do Pedido ... */}

      <button
        onClick={handleFinalizePurchase}
        disabled={isProcessing}
        className={`w-full py-4 text-white font-bold rounded-lg transition-colors ${
          isProcessing
            ? "bg-green-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isProcessing
          ? "Processando..."
          : `Pagar e Finalizar (R$ ${subtotal.toFixed(2)})`}
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        O carrinho será limpo após a finalização da compra.
      </div>
    </div>
  );
}
