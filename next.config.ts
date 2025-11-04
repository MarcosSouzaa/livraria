// next.config.ts (CORRIGIDO)
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para permitir domínios de imagens externas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc", // 🚨 O DOMÍNIO QUE ESTÁ CAUSANDO O ERRO
        port: "",
        pathname: "/**",
      },
    ],
  },

  // (Outras configurações, como a função webpack se  ainda precisar dela)
  // webpack: (config, { isServer }) => { return config; },
};

export default nextConfig;
