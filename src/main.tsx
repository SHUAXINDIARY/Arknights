import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/Home/App.tsx";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./utils/I18n/i18n.ts";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router";
import ShowRes from "./pages/Result/ShowResult.tsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function RouteTransition() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        <Outlet />
      </motion.main>
    </AnimatePresence>
  );
}

const ROUTES = createBrowserRouter([
  {
    Component: RouteTransition,
    children: [
      { path: "/", Component: App },
      { path: "/result", Component: ShowRes },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <NextThemesProvider themes={["dark"]}>
    <RouterProvider router={ROUTES} />
  </NextThemesProvider>
);
