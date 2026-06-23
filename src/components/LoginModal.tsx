import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Mail, Lock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function LoginModal({
  onClose,
  onLoginSuccess,
}: {
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t.login.errorRequired);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordRaw: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.login.errorInvalid);
      }

      localStorage.setItem("vipercar_token", data.token);
      localStorage.setItem("vipercar_user", JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err: any) {
      const connectionError = 
        language === "pt" 
          ? "Erro de conexão com o servidor" 
          : language === "es" 
            ? "Error de conexión con el servidor" 
            : "Server connection error";
      setError(err.message || connectionError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-modal-bg border border-modal-border rounded-[2.5rem] shadow-2xl overflow-hidden transition-colors duration-300"
      >
        {/* Ambient background light */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-8 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-card-bg text-text-secondary border border-card-border hover:text-text-primary hover:bg-card-bg/85 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="mb-10 text-center">
            <div className="inline-flex w-32 h-32 rounded-full bg-card-bg items-center justify-center shadow-2xl shadow-cyan-500/5 mb-6 border border-card-border overflow-hidden">
              <img
                src="/logo.png"
                alt="Viper Car Emblem"
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-2 tracking-tight">
              {t.login.title}
            </h2>
            <p className="text-text-secondary text-sm">
              {t.login.subtitle}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 ml-1">
                {t.login.email}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.login.placeholderEmail}
                  disabled={isLoading}
                  className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-4 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 ml-1">
                {t.login.password}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.placeholderPassword}
                  disabled={isLoading}
                  className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-4 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a
                  href="#"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {t.login.forgotPassword}
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t.login.btnSubmitLoading}
                </>
              ) : (
                t.login.btnSubmit
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-x-0 h-px bg-card-border"></div>
              <span className="relative px-4 bg-modal-bg text-xs font-bold text-text-muted uppercase tracking-widest transition-colors duration-300">
                {t.login.dividerOr}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-card-bg border border-card-border py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm font-semibold text-text-primary cursor-pointer">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 bg-card-bg border border-card-border py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm font-semibold text-text-primary cursor-pointer">
                <svg
                  className="w-5 h-5 text-text-primary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05 1.79-3.32 1.79-1.25 0-1.66-.78-3.14-.78-1.47 0-1.93.76-3.14.76-1.28 0-2.33-.84-3.31-1.78-2-1.89-3.53-5.32-3.53-8.5 0-5.15 3.34-7.88 6.51-7.88 1.66 0 3.03.62 3.99.62.95 0 2.51-.76 4.41-.56 1.83.18 3.23.95 4.09 2.17-3.79 2.21-3.18 7.23.63 8.8-.76 1.95-1.73 3.86-3.23 5.3zm-3.11-17.72c.86-1.04 1.44-2.48 1.44-3.92-1.24.05-2.73.83-3.63 1.87-.81.93-1.51 2.42-1.51 3.83 1.39.11 2.8-.73 3.7-1.78z" />
                </svg>
                Apple
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-text-muted">
              {t.login.noAccount}{" "}
              <a
                href="https://viper-car-app.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-text-primary hover:text-cyan-400 transition-colors"
              >
                {t.login.registerNow}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
