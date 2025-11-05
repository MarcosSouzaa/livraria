// src/app/cart/_component/CheckoutOptions.tsx
"use client";

import React, { useState } from "react";

// Definições de Tipos (se você não tiver em outro lugar)
type PaymentMethod = "Pix" | "Cartão de Crédito" | "Cartão de Débito" | null;
type ShippingMethod = "Correios" | "Transportadora" | null;

// Interface para as props (opcional, se você quiser levantar o estado)
interface CheckoutOptionsProps {
  onSelectOptions: (payment: PaymentMethod, shipping: ShippingMethod) => void;
  // Se quiser que o componente retorne os valores selecionados no final
}

const CheckoutOptions: React.FC<CheckoutOptionsProps> = ({
  onSelectOptions,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingMethod>(null);

  const paymentOptions: PaymentMethod[] = [
    "Pix",
    "Cartão de Crédito",
    "Cartão de Débito",
  ];
  const shippingOptions: ShippingMethod[] = ["Correios", "Transportadora"];

  const isReadyToProceed = selectedPayment && selectedShipping;

  const handleProceed = () => {
    if (isReadyToProceed) {
      onSelectOptions(selectedPayment, selectedShipping);
      // 🚨 Aqui, a função no componente PAI (CartPage) pode redirecionar para uma página de pagamento/resumo
    }
  };

  const renderOptionButtons = (
    title: string,
    options: (PaymentMethod | ShippingMethod)[],
    selected: PaymentMethod | ShippingMethod,
    setter: (value: PaymentMethod | ShippingMethod) => void
  ) => (
    <div className="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setter(option)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border-2 ${
              selected === option
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white border-b pb-2">
        Opções de Checkout
      </h2>

      {/* Seleção de Pagamento */}
      {renderOptionButtons(
        "Selecione o Método de Pagamento",
        paymentOptions,
        selectedPayment,
        // 🚨 CORREÇÃO AQUI: Cast para o tipo mais amplo (PaymentMethod | ShippingMethod)
        setSelectedPayment as (value: PaymentMethod | ShippingMethod) => void
      )}

      {/* Seleção de Entrega */}
      {renderOptionButtons(
        "Selecione o Método de Entrega",
        shippingOptions,
        selectedShipping,
        // 🚨 CORREÇÃO AQUI: Cast para o tipo mais amplo (PaymentMethod | ShippingMethod)
        setSelectedShipping as (value: PaymentMethod | ShippingMethod) => void
      )}
      {/* Botão de Finalizar Compra */}
      <button
        onClick={handleProceed}
        disabled={!isReadyToProceed}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-colors duration-300 ${
          isReadyToProceed
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default CheckoutOptions;
export type { PaymentMethod, ShippingMethod }; // Exporta os tipos para uso no PAI
