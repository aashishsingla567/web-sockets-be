import type { Route } from "./types";

import { Router } from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import notificationRoutes from "./notification.route";

const router = Router();

const routes: Route[] = [
  {
    path: "/auth",
    router: authRoutes,
  },
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/notification",
    router: notificationRoutes,
  },
];

for (const route of routes) {
  router.use(route.path, route.router);
}

export default router;
