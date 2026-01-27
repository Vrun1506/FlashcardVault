import { type NextRequest } from 'next/server'
// We can keep using your existing helper logic
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  // The logic remains the same, just the function name changed
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}