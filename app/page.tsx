import Link from "next/link";
import { Zap, User } from "lucide-react";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Stats } from "@/components/landing/stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Header / Top Navigation */}
      <header className="h-16 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-extrabold tracking-tight text-lg">StadiumMind</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-slate-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="#stats" className="text-slate-400 hover:text-white transition-colors">
            Tournament Stats
          </a>
          <a href="#workflow" className="text-slate-400 hover:text-white transition-colors">
            Workflow
          </a>
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs font-semibold gap-1.5 h-9">
              <User className="w-3.5 h-3.5" />
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="glow" size="sm" className="text-xs font-semibold h-9 px-4">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <div id="features">
          <Features />
        </div>

        {/* Stats Section */}
        <div id="stats">
          <Stats />
        </div>

        {/* Workflow Section */}
        <div id="workflow">
          <HowItWorks />
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
