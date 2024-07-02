import { NextResponse } from 'next/server';

export function middleware(req) {
   const { pathname } = req.nextUrl;
   const isCookiesExist = !! req.cookies.get('user_token');
   const isLoginPage = pathname.startsWith('/login');

   if(!isCookiesExist && !isLoginPage){
      return NextResponse.redirect(new URL('/login', req.url))
   } 

   if(isCookiesExist && isLoginPage){
      return NextResponse.redirect(new URL('/', req.url))
   }
   
   return NextResponse.next();
}

export const config = {
   matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};