import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import InfoModal from "./components/InfoModal.tsx";
import "./i18n.ts";
import "./utils/webgl/index.ts";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <NextThemesProvider themes={["dark"]}>
      <App />
      <InfoModal />
    </NextThemesProvider>
  </HeroUIProvider>
);
