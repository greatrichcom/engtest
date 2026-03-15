"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/useUserStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    // 1. 초기 세션 확인
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // 프로필 정보 패치 (닉네임 등)
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
          
        if (profile) {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchSession();

    // 2. 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          if (profile) {
            setUser(profile);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
