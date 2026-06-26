import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/home";
import Products from "./pages/products";
import Legal from "./pages/legal";

export const router = createBrowserRouter(
  [
    {
      Component: Layout,
      children: [
        { path: "/", Component: Home },
        { path: "/produits", Component: Products },
        { path: "/mentions-legales", Component: Legal },
        { path: "*", Component: Home },
      ],
    },
  ],
  { basename: "/COAL./" }
);
