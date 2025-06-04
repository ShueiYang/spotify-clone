import { type NextRequest } from "next/server";
import { updateSession } from "./supabase/utils/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  /*
   * Only match paths that:
   * - start with /liked or /account
   * - OR don't start with _next/static, _next/image, favicon.ico, or image files
   */
  matcher: [
    "/liked/:path*",
    "/account/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
