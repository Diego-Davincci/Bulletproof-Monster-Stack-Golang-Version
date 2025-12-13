import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { lazy } from "react";

type RouterContext = {};

const RouterDevTools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        import("@tanstack/react-router-devtools").then((d) => ({
          default: d.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <RouterDevTools position="bottom-right" />
    </>
  ),
});
