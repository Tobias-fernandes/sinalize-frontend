"use client";

import { useState } from "react";
import { Eye, EyeOff, Hand, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const name = email.includes("@") ? email.split("@")[0] : email;
    onLogin(name || "Usuário");
  }

  return (
    <div className="relative isolate flex min-h-dvh w-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklab,var(--color-primary)_22%,white)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_110%,color-mix(in_oklab,#f59e0b_18%,white)_0%,transparent_60%)]" />

      {/* Left branding panel — visible on md+ */}
      <div className="relative hidden flex-col justify-between p-10 md:flex md:w-[44%] lg:w-[38%]">
        <div className="flex items-center gap-2.5 animate-fade-up">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15">
            <Hand className="size-5 text-primary" />
          </div>
          <span className="font-heading text-lg font-semibold text-foreground">
            Sinalize
          </span>
        </div>

        <div className="space-y-4 animate-fade-up [animation-delay:100ms]">
          <div className="space-y-3">
            {[
              {
                icon: "🤟",
                title: "Quiz de Libras",
                desc: "Perguntas sobre a Língua Brasileira de Sinais",
              },
              {
                icon: "⚡",
                title: "Tempo real",
                desc: "Multiplayer com resultados instantâneos",
              },
              {
                icon: "🏆",
                title: "Placar dinâmico",
                desc: "Pontuação com ranking ao vivo",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/60 px-4 py-3 backdrop-blur-sm"
              >
                <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground animate-fade-up [animation-delay:200ms]">
          © 2026 Sinalize · Quiz de Libras
        </p>
      </div>

      {/* Right form panel */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8 animate-fade-up">
          {/* Mobile logo */}
          <div className="flex flex-col items-center gap-3 md:hidden">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
              <Hand className="size-6 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Sinalize</h1>
          </div>

          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Boas-vindas de volta
            </h2>
            <p className="text-sm text-muted-foreground">
              Entre com sua conta para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={loading}
                className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm shadow-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/20 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 pr-11 text-sm shadow-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/20 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!email.trim() || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                Modo demonstração
              </span>{" "}
              — qualquer e-mail funciona. Nenhuma senha é verificada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
