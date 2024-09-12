export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/balance",
    "/payment",
    "/users/:path*", // Match any subpath under users
    "/watchlist",
    "/notification",
  ]
};