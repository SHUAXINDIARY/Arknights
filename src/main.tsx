import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import InfoModal from "./components/InfoModal.tsx";
import "./i18n.ts";


createRoot(document.getElementById("root")!).render(    <NextUIProvider>
  <NextThemesProvider themes={["dark"]}>
    <App />
    <InfoModal />
  </NextThemesProvider>
</NextUIProvider>);
