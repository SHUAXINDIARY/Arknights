import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import InfoModal from "./components/InfoModal.tsx";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ZH from "./language/zh.json";
import EN from "./language/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN,
    },
    zh: {
      translation: ZH,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <NextThemesProvider themes={["dark"]}>
        <App />
        <InfoModal />
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>
);
