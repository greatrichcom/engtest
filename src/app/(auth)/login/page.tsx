"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("이메일 또는 비밀번호를 다시 확인해 주세요!");
      setLoading(false);
      return;
    }

    // Auth 성공, profile 데이터 추가 패치 및 스토어 저장 로직 등 구현 예정
    router.push("/lobby");
    setLoading(false);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full flex-1 flex items-center justify-center animate-pop-in">
        <Card className="w-full max-w-sm rounded-[2rem]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-zen-peach rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-3xl font-heading text-zen-purple">Zen-Pop</h1>
            <p className="text-sm text-text-secondary mt-1 font-body">
              모험을 시작해 볼까요?
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="이메일 (초능력자 ID)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              className="w-full mt-4 bg-zen-purple hover:bg-zen-purple-dark text-white text-xl"
              isLoading={loading}
            >
              로그인
            </Button>
            
            <div className="pt-4 border-t border-dashed border-zen-lavender-dark mt-6">
              <p className="text-xs text-text-secondary text-center mb-3 font-body">
                처음 오셨나요? 지금 바로 모험가 등록을 해보세요!
              </p>
              <Button
                type="button"
                size="lg"
                className="w-full text-lg bg-zen-pink hover:bg-zen-pink-dark text-white shadow-pop hover:scale-105 active:scale-95 transition-all"
                onClick={() => router.push("/signup")}
                disabled={loading}
              >
                무료 회원가입 하기 ✨
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
