import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import "./index.css";
import { Toaster } from "sonner";
import ReactQueryWrapper from "./lib/api/query-client.tsx";

const router = createRouter({
  routeTree,
  // TODO: auth context
  context: {},
  defaultNotFoundComponent: () => {
    return <Navigate to={"/"} replace />;
  },
});

function App() {
  return (
    <ReactQueryWrapper>
      <Toaster richColors />
      <RouterProvider router={router} context={{}} />
    </ReactQueryWrapper>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
