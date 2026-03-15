import { StatusBar } from "@/components/layout/StatusBar";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full relative">
      <StatusBar />
      <div className="flex-1 overflow-y-auto pb-6 relative scroll-smooth">
        {children}
      </div>
    </div>
  );
}
