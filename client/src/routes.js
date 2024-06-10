import { lazy } from "react";

export const pageRoutes = [
  {
    path: "/",
    component: lazy(() => import("./components/Home")),
  },
  {
    path: "/interviews",
    component: lazy(() =>
      import("./components/Projects/interviews/LandingPage")
    ),
  },
  {
    path: "/interviews/new",
    component: lazy(() =>
      import("./components/Projects/interviews/NewInterview")
    ),
  },
];
