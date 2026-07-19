"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, Phone, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

const ROLE_OPTIONS = [
  { value: "fan", label: "Fan / Spectator" },
  { value: "volunteer", label: "Volunteer" },
  { value: "security", label: "Security Staff" },
  { value: "medical", label: "Medical Team" },
  { value: "operations", label: "Operations Manager" },
  { value: "admin", label: "Administrator" },
];

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "fan", language: "en" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: data.full_name,
          role: data.role,
        },
      },
    });

    if (error) {
      toast.error("Registration failed", { description: error.message });
      return;
    }

    if (authData.user) {
      // Create profile
      await (supabase as any).from("profiles").upsert({
        id: authData.user.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        phone: data.phone ?? null,
        language: "en",
        accessibility_needs: [],
      });
    }

    toast.success("Account created!", {
      description: "Please check your email to verify your account.",
    });
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md"
    >
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold">StadiumMind AI</div>
            <div className="text-slate-400 text-xs">FIFA World Cup 2026</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
        <p className="text-slate-400 text-sm mb-6">Join the stadium operations platform</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Smith"
            icon={<User className="w-4 h-4" />}
            error={errors.full_name?.message}
            {...register("full_name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Phone (optional)"
            type="tel"
            placeholder="+1 (555) 000-0000"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          <Select
            label="Role"
            options={ROLE_OPTIONS}
            placeholder="Select your role"
            error={errors.role?.message}
            {...register("role")}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              icon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat password"
            icon={<Lock className="w-4 h-4" />}
            error={errors.confirm_password?.message}
            {...register("confirm_password")}
          />

          <Button
            type="submit"
            variant="glow"
            className="w-full"
            isLoading={isSubmitting}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
