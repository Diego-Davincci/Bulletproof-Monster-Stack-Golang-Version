import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import "./index.css";

const router = createRouter({
  routeTree,
  // TODO: auth context
  context: {},
  defaultNotFoundComponent: () => {
    return <Navigate to={"/"} replace />;
  },
});

function App() {
  // TODO: ReactQuery wrapper, Sonner wrapper
  return (
    <>
      <RouterProvider router={router} context={{}} />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
