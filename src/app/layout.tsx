import type { Metadata } from "next";
import { Jua, Nunito, Fredoka } from "next/font/google";
import "./globals.css";

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zen-Pop | 힐링 영단어 게임",
  description: "초등학생을 위한 힐링 애니메이션 팝 영단어 학습 RPG",
  manifest: "/manifest.json",
};

import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { LevelUpModal } from "@/components/game/LevelUpModal";
import { InventoryModal } from "@/components/game/InventoryModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${jua.variable} ${nunito.variable} ${fredoka.variable} antialiased font-body bg-bg text-text-primary h-screen w-screen overflow-hidden`}
      >
        <div className="mx-auto h-full w-full max-w-md bg-white shadow-2xl relative overflow-hidden flex flex-col tablet:max-w-lg desktop:max-w-xl">
          <QueryProvider>
            <AuthProvider>
              {children}
              <LevelUpModal />
              <InventoryModal />
            </AuthProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
