import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') 
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // ❌ OLD: return NextResponse.redirect`${origin}${next}`)
        // ✅ NEW:
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // ❌ OLD: return NextResponse.redirect`https://${forwardedHost}${next}`)
        // ✅ NEW:
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        // ❌ OLD: return NextResponse.redirect`${origin}${next}`)
        // ✅ NEW:
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }
  
  // ❌ OLD: return NextResponse.redirect`${origin}/auth/auth-code-error`)
  // ✅ NEW:
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}