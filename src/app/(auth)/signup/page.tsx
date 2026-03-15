"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const supabase = createClient();
    
    // Auth 회원가입. (가입 후 이메일 인증이 꺼져있다면 즉시 세션 생성)
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: nickname || "모험자",
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    // 성공 시 로비(또는 로그인 창)로 이동
    router.push("/lobby");
    setLoading(false);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full flex-1 flex items-center justify-center animate-pop-in">
        <Card className="w-full max-w-sm rounded-[2rem]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-heading text-zen-pink">새 모험가 등록</h1>
            <p className="text-sm text-text-secondary mt-1 font-body">
              Zen-Pop 세상에 오신 걸 환영해요!
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="모험가 이름 (닉네임)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="가입할 이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="비밀번호 (6자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-wrong text-xs font-bold text-center mt-2 animate-shake">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full mt-4 text-xl"
              isLoading={loading}
            >
              모험 시작하기
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full mt-2"
              onClick={() => router.push("/login")}
              disabled={loading}
            >
              돌아가기
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
