// Import necessary modules
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Define the middleware
export default withAuth(
  async (req) => {
    // Extract the token from the request
    const token = await getToken({ req });
    const isAuthenticated = !!token; // Check if the token exists (i.e., user is authenticated)
    const { pathname } = req.nextUrl;

    // List of paths to protect
    const protectedPaths = [
      '/farmers/viewProfile/',
      '/users/viewProfile/',
      '/dashboard/farmers/update/',
      '/users/update/',
    ];

    // Check if the request URL matches any protected path and if the user is authenticated
    const isProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path),
    );
    if (isProtectedPath && !isAuthenticated) {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Get the user role from the token
    const userRole = token?.role;

    // Restrict non-admin users from certain paths
    const restrictedFarmerPaths = [
      '/dashboard/categories',
      '/dashboard/banners',
      '/dashboard/customers',
      '/dashboard/markets',
      '/dashboard/community',
      // '/dashboard/farmers/update/', // This path is explicitly allowed for FARMER
      '/dashboard/farmers', // Other paths under /dashboard/farmers can be restricted
      // Add more restricted paths for non-admin users if needed
    ];

    // Special handling for /dashboard/farmers/update/:id route for FARMER role
    const isFarmerUpdatePath =
      userRole === 'FARMER' &&
      pathname.startsWith('/dashboard/farmers/update/');
    if (isFarmerUpdatePath) {
      // Allow FARMER to access /dashboard/farmers/update/:id
      return NextResponse.next();
    }

    const isRestrictedFarmerPath = restrictedFarmerPaths.some((path) =>
      pathname.startsWith(path),
    );
    if (userRole !== 'ADMIN' && isRestrictedFarmerPath) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Restrict certain paths for admin users
    const restrictedAdminPaths = [
      '/dashboard/products/update/',
      '/dashboard/customers/update/',
      '/dashboard/farmers/new/',
      // Add more restricted paths for admins if needed
    ];
    const isRestrictedAdminPath = restrictedAdminPaths.some((path) =>
      pathname.startsWith(path),
    );
    if (userRole === 'ADMIN' && isRestrictedAdminPath) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login', // Page to redirect to if not authenticated
    },
  },
);

// Export configuration for the middleware
export const config = {
  matcher: [
    '/checkout',
    '/dashboard/:path*',
    '/farmers/viewProfile/:id*',
    '/users/viewProfile/:id*',
    '/dashboard/farmers/update/:id*',
    '/users/update/:id*',
  ],
};
