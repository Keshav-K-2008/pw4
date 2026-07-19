import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      {children}
    </div>
  );
}
