import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/Home/App.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./utils/I18n/i18n.ts";
import { createBrowserRouter, RouterProvider } from "react-router";
import ShowRes from "./pages/Result/ShowResult.tsx";
import Questionnaire from "./pages/Questionnaire/index.tsx";

const ROUTES = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/result",
    Component: ShowRes,
  },
  {
    path: "/questionnaire",
    Component: Questionnaire,
  },
]);

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <NextThemesProvider themes={["dark"]}>
      <RouterProvider router={ROUTES} />
    </NextThemesProvider>
  </HeroUIProvider>
);
