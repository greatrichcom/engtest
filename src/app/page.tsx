import { redirect } from "next/navigation";

export default function HomePage() {
  // 앱 진입 시 최우선적으로 로그인 페이지를 보여주도록 수정
  redirect("/login");
}
