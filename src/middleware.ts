import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/supabase/database.types"

export async function middleware(req: NextRequest) {
  const url = req.url
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data } = await supabase.auth.getSession()
 
  if(data.session === null &&
    (req.nextUrl.pathname.startsWith("/liked") || req.nextUrl.pathname.startsWith("/account"))
  ) {
    return NextResponse.redirect(new URL("/", url))
  }
  return res;
}
