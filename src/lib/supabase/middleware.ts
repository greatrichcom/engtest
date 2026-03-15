import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인되지 않은 사용자가 game (예: /lobby 등) 경로 접근 방지
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');
  const isProtectedPath = !isAuthPage && request.nextUrl.pathname !== '/'; 

  // 미인증 시 바로 로그인 페이지로 보내달라는 요청 반영
  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 로그인 상태에서 로그인/회원가입 창으로 가려고 하면 로비로 튕기기
  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/lobby";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
