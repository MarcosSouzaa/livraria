// src/app/cart/_component/CheckoutOptions.tsx

import React, { useState } from "react";

// Tipos de opções
export type PaymentMethod = "creditCard" | "bankSlip" | null;
export type ShippingMethod = "sedex" | "pac" | null;

// ✅ CORREÇÃO: Adicionando a prop 'disabled' na interface
interface CheckoutOptionsProps {
  onSelectOptions: (payment: PaymentMethod, shipping: ShippingMethod) => void;
  disabled: boolean; // Resolve o erro no CartClient.tsx
}

const CheckoutOptions: React.FC<CheckoutOptionsProps> = ({
  onSelectOptions,
  disabled, // Recebendo a prop
}) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingMethod>(null);

  const isReadyToProceed =
    selectedPayment !== null && selectedShipping !== null;

  const handleProceed = () => {
    if (isReadyToProceed && !disabled) {
      onSelectOptions(selectedPayment!, selectedShipping!);
    }
  };

  return (
    <div className="space-y-6">
      {/* ... (Seleção de Pagamento e Envio) ... */}

      {/* Botão Finalizar Pedido */}
      <button
        onClick={handleProceed}
        // ✅ APLICAÇÃO DA CORREÇÃO: Usa a prop 'disabled' e o estado local 'isReadyToProceed'.
        disabled={disabled || !isReadyToProceed}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${
          disabled || !isReadyToProceed
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {disabled ? "Processando Pedido..." : "Finalizar Pedido"}
      </button>
    </div>
  );
};

export default CheckoutOptions;
