import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
   function middleware(req) {
      if(req.nextUrl.pathname === "/profile" && req.nextauth.token?.role === 'GUEST'){
         return NextResponse.redirect(new URL('/task', req.url));
      }
   },
   {
      callbacks: {
         authorized: ({ token }) => {
            return !! token;
         },
      },
   }
);

export const config = {
   matcher: ['/task', '/profile'],
};
