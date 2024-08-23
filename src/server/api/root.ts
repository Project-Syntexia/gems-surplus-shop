import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "@/server/api/routers/user";
import { productsRouter } from "./routers/product";
import { commentsRouter } from "./routers/comments";
import { cartsRouter } from "./routers/cart";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cart: cartsRouter,
  comment: commentsRouter,
  product: productsRouter,
  user: usersRouter,
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
