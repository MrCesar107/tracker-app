import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isSignIn = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUp = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignIn || isSignUp) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
