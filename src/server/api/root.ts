import {
  createCallerFactory,
  createTRPCRouter,
  mergeRouters,
} from "@/server/api/trpc";
import { productRouter as adminProductRouter } from "@/server/api/routers/admin/product";
import { cartRouter as protectedCartRouter } from "@/server/api/routers/protected/cart";
import { commentRouter as protectedCommentsRouter } from "@/server/api/routers/protected/comment";
import { productRouter as protectedProductRouter } from "@/server/api/routers/protected/product";
import { userRouter as protectedUsersRouter } from "@/server/api/routers/protected/user";
import { commentRouter as publicCommentsRouter } from "@/server/api/routers/public/comment";
import { generalRouter } from "@/server/api/routers/public/general";
import { productRouter as publicProductRouter } from "@/server/api/routers/public/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  general: generalRouter,
  cart: mergeRouters(protectedCartRouter),
  comment: mergeRouters(protectedCommentsRouter, publicCommentsRouter),
  product: mergeRouters(
    adminProductRouter,
    publicProductRouter,
    protectedProductRouter,
  ),
  user: mergeRouters(protectedUsersRouter),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
