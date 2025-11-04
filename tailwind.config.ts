// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  // ESSENCIAL: Garanta que 'content' cubra suas pastas _component e components
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/_component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}", // Se esta pasta existir
  ],
  theme: {
    extend: {
      colors: {
        // Exemplo de cores customizadas se você as usa:
        "primary-confianca": "var(--color-primary-confianca)",
        "destaque-acao": "var(--color-destaque-acao)",
        // ... (resto das suas cores)
      },
    },
  },
  plugins: [],
};

export default config;
