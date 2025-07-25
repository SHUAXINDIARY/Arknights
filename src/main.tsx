import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import InfoModal from "./components/InfoModal.tsx";
import "./i18n.ts";
import { createBrowserRouter, RouterProvider } from "react-router";
import ShowRes from "./components/ShowResult.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/result",
    Component: ShowRes,
  },
]);

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <NextThemesProvider themes={["dark"]}>
      <RouterProvider router={routes} />
      <InfoModal />
    </NextThemesProvider>
  </HeroUIProvider>
);
