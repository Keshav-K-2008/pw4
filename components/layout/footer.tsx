import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">StadiumMind</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Next-generation AI Operating System for Smart Stadiums & Tournament Operations. Powering the FIFA World Cup 2026.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Features</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                Operations Dashboard
              </Link>
            </li>
            <li>
              <Link href="/map" className="text-slate-400 hover:text-white transition-colors">
                Live Crowd Map
              </Link>
            </li>
            <li>
              <Link href="/ai-assistant" className="text-slate-400 hover:text-white transition-colors">
                Gemini AI Assistant
              </Link>
            </li>
            <li>
              <Link href="/crowd-analysis" className="text-slate-400 hover:text-white transition-colors">
                Predictive Analytics
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Role Access</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/emergency" className="text-slate-400 hover:text-white transition-colors">
                Emergency Dispatch
              </Link>
            </li>
            <li>
              <Link href="/volunteers" className="text-slate-400 hover:text-white transition-colors">
                Volunteer Panel
              </Link>
            </li>
            <li>
              <Link href="/security" className="text-slate-400 hover:text-white transition-colors">
                Security Control
              </Link>
            </li>
            <li>
              <Link href="/medical" className="text-slate-400 hover:text-white transition-colors">
                Medical Coordination
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tournament</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-slate-400">FIFA World Cup 2026</li>
            <li className="text-slate-400">Host Cities & Venues</li>
            <li className="text-slate-400">MetLife Stadium, NJ/NY</li>
            <li className="text-slate-400">Operations Control protocol</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} StadiumMind AI. All rights reserved. FIFA World Cup 2026 Operations.
        </p>
        <div className="flex gap-6 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Security Audit</a>
        </div>
      </div>
    </footer>
  );
}
