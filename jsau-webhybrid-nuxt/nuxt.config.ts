export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8081", // Adresse de jsau-apiserver
    },
  },

  css: ["@/styles/global.css"],

  compatibilityDate: "2025-02-23",
});
