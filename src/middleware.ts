import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAPI = createRouteMatcher(["/api(.*)"]);
const isPublic = createRouteMatcher(["/login(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (isAPI(request)) {
    return;
  }
  if (!isPublic(request) && auth().userId === null) {
    console.log("User is not signed in!");
    return NextResponse.redirect(new URL("/login", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/",
  ],
};
