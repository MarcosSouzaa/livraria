// src/app/policy/page.tsx
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto p-4 md:p-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Política de Privacidade
      </h1>

      <div className="max-w-4xl text-lg text-gray-700 dark:text-gray-300 space-y-6">
        <p>
          Esta Política de Privacidade descreve como a Livraria Online coleta,
          usa e protege as suas informações pessoais ao utilizar nosso site.
        </p>

        <h2 className="text-2xl font-semibold pt-4 text-gray-900 dark:text-white">
          1. Informações Coletadas
        </h2>
        <p>
          Coletamos informações que você nos fornece diretamente, como nome,
          endereço de e-mail e endereço de envio ao fazer um pedido.
        </p>

        <h2 className="text-2xl font-semibold pt-4 text-gray-900 dark:text-white">
          2. Uso das Informações
        </h2>
        <p>
          Suas informações são usadas exclusivamente para processar seus
          pedidos, comunicar-se sobre o status da compra e, se permitido, enviar
          informações promocionais.
        </p>

        <h2 className="text-2xl font-semibold pt-4 text-gray-900 dark:text-white">
          3. Segurança
        </h2>
        <p>
          Empregamos medidas de segurança razoáveis para proteger suas
          informações. Todas as transações de pagamento são processadas por
          terceiros seguros (PIX/Stripe/etc.) e não armazenamos dados de cartão
          de crédito.
        </p>

        <h2 className="text-2xl font-semibold pt-4 text-gray-900 dark:text-white">
          4. Cookies
        </h2>
        <p>
          Utilizamos cookies para manter o estado do seu carrinho de compras e
          para fins de análise. Você pode desativar os cookies no seu navegador,
          mas isso pode afetar a funcionalidade do site.
        </p>

        <p className="text-sm pt-6 italic">
          Última atualização: Outubro de 2025.
        </p>
      </div>
    </main>
  );
}
