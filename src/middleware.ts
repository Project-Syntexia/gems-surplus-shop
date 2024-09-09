import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAPI = createRouteMatcher(["/api(.*)"]);
const isPublic = createRouteMatcher(["/login(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isAPI(req)) {
    return;
  }
  if (!isPublic(req) && auth().userId === null) {
    console.log("User is not signed in!");
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
