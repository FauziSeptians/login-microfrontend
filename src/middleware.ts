import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || ''
    );
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // If nothing matched, just continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
