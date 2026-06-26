import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Products from "./pages/products";
import Legal from "./pages/legal";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/produits", Component: Products },
  { path: "/mentions-legales", Component: Legal },
  { path: "*", Component: Home },
]);
