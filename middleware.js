import { withAuth } from 'next-auth/middleware'

export default withAuth(
    function middleware(req) {
        // Add any additional logic here if needed
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: ['/cart/:path*', '/checkout/:path*', '/profile/:path*']
}