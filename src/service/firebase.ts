import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Sua configuração (usando suas credenciais fornecidas)
const firebaseConfig = {
  apiKey: "AIzaSyAhld2bhpRIi1uzj87qs59y6HJupaBAMJw",
  authDomain: "livraria-13ba3.firebaseapp.com",
  projectId: "livraria-13ba3",
  storageBucket: "livraria-13ba3.firebasestorage.app",
  messagingSenderId: "380008534185",
  appId: "1:380008534185:web:45e3e881b1072b90a159b8",
  measurementId: "G-MN76HQW296",
};

// Inicialização Condicional
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
// Opcional: exporta o Analytics (se precisar)
//export const analytics = getAnalytics(app);
//export const db = getFirestore(app);

// 🚨 CORREÇÃO: Inicializa o Analytics SOMENTE no lado do cliente
let analytics;
if (typeof window !== "undefined") {
  // O Firebase Analytics é inicializado apenas se 'window' existir
  analytics = getAnalytics(app);
}
// export const analytics = getAnalytics(app); // Linha ANTIGA com erro

// 🚨 O Firestore (db) é seguro para o servidor e pode ser exportado diretamente
export const db = getFirestore(app);

// Opcional: exporta a instância de Analytics (que será undefined no servidor)
export { analytics };
