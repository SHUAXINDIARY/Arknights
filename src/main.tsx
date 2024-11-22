import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import InfoModal from "./components/InfoModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <NextThemesProvider themes={["dark"]}>
        {/* <main className="dark text-foreground bg-background"> */}
        <App />
        <InfoModal />
        {/* </main> */}
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>
);
