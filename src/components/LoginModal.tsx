import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Building, ShieldCheck, KeyRound, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  pt: {
    registerTitle: "Criar Conta Grátis",
    registerSubtitle: "Comece a gerenciar seu pátio de forma profissional",
    userName: "Seu Nome",
    placeholderUserName: "Digite seu nome",
    businessName: "Nome do Lava-Jato",
    placeholderBusinessName: "Ex: Lava-Jato Viper",
    confirmPassword: "Confirmar Senha",
    btnRegister: "Registrar e Continuar",
    alreadyHaveAccount: "Já tem uma conta?",
    loginNow: "Fazer Login",
    forgotTitle: "Recuperar Senha",
    forgotSubtitle: "Digite seu e-mail para receber um código de 6 dígitos",
    btnSendForgot: "Enviar Código",
    backToLogin: "Voltar para o Login",
    otpVerifyTitle: "Verifique seu E-mail",
    otpVerifySubtitle: "Digite o código de 6 dígitos enviado para",
    btnVerifyOtp: "Confirmar Código",
    resendCode: "Reenviar Código",
    otpResetTitle: "Confirmar Código",
    otpResetSubtitle: "Digite o código de recuperação enviado para",
    resetTitle: "Nova Senha",
    resetSubtitle: "Crie uma senha forte e segura para sua conta",
    btnResetSubmit: "Alterar Senha",
    strengthLabel: "Força da Senha:",
    strengthWeak: "Fraca",
    strengthMedium: "Média",
    strengthStrong: "Forte",
    successReset: "Senha alterada com sucesso! Faça login.",
    errorRequired: "Preencha todos os campos obrigatórios",
  },
  en: {
    registerTitle: "Create Free Account",
    registerSubtitle: "Start managing your business professionally",
    userName: "Your Name",
    placeholderUserName: "Enter your name",
    businessName: "Business Name",
    placeholderBusinessName: "Ex: Viper Car Wash",
    confirmPassword: "Confirm Password",
    btnRegister: "Register & Continue",
    alreadyHaveAccount: "Already have an account?",
    loginNow: "Log In",
    forgotTitle: "Recover Password",
    forgotSubtitle: "Enter your email to receive a 6-digit code",
    btnSendForgot: "Send Code",
    backToLogin: "Back to Login",
    otpVerifyTitle: "Verify your Email",
    otpVerifySubtitle: "Enter the 6-digit code sent to",
    btnVerifyOtp: "Verify Code",
    resendCode: "Resend Code",
    otpResetTitle: "Verify Reset Code",
    otpResetSubtitle: "Enter the recovery code sent to",
    resetTitle: "New Password",
    resetSubtitle: "Create a strong and secure password",
    btnResetSubmit: "Reset Password",
    strengthLabel: "Password Strength:",
    strengthWeak: "Weak",
    strengthMedium: "Medium",
    strengthStrong: "Strong",
    successReset: "Password reset successfully! Please log in.",
    errorRequired: "Fill in all required fields",
  },
  es: {
    registerTitle: "Crear Cuenta Gratis",
    registerSubtitle: "Comience a gestionar su negocio de forma profesional",
    userName: "Su Nombre",
    placeholderUserName: "Escriba su nombre",
    businessName: "Nombre del Lavadero",
    placeholderBusinessName: "Ej: Autolavado Viper",
    confirmPassword: "Confirmar Contraseña",
    btnRegister: "Registrarse y Continuar",
    alreadyHaveAccount: "¿Ya tiene una cuenta?",
    loginNow: "Iniciar Sesión",
    forgotTitle: "Recover Password",
    forgotSubtitle: "Escriba su correo para recibir un código de 6 dígitos",
    btnSendForgot: "Enviar Código",
    backToLogin: "Volver a Iniciar Sesión",
    otpVerifyTitle: "Verifique su Correo",
    otpVerifySubtitle: "Escriba el código de 6 dígitos enviado a",
    btnVerifyOtp: "Confirmar Código",
    resendCode: "Reenviar Código",
    otpResetTitle: "Confirmar Código",
    otpResetSubtitle: "Escriba el código de recuperación enviado a",
    resetTitle: "Nueva Contraseña",
    resetSubtitle: "Cree una contraseña fuerte y segura",
    btnResetSubmit: "Cambiar Contraseña",
    strengthLabel: "Fuerza de la Contraseña:",
    strengthWeak: "Débil",
    strengthMedium: "Media",
    strengthStrong: "Fuerte",
    successReset: "¡Contraseña cambiada con éxito! Inicie sesión.",
    errorRequired: "Complete todos los campos obligatorios",
  }
};

export function LoginModal({
  onClose,
  onLoginSuccess,
  initialMode = "login",
}: {
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
  initialMode?: "login" | "register" | "forgot" | "otp-verify" | "otp-reset" | "reset-password";
}) {
  const { t, language } = useLanguage();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "otp-verify" | "otp-reset" | "reset-password">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activeLang = language === "es" ? "es" : language === "en" ? "en" : "pt";
  const tLocal = translations[activeLang];

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "text-slate-400", bg: "bg-slate-500/20" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: tLocal.strengthWeak, color: "text-red-400", bg: "bg-red-500" };
    if (score <= 4) return { score, label: tLocal.strengthMedium, color: "text-yellow-400", bg: "bg-yellow-500" };
    return { score, label: tLocal.strengthStrong, color: "text-emerald-400", bg: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t.login.errorRequired);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordRaw: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "EMAIL_NOT_VERIFIED") {
          setMode("otp-verify");
          setError(null);
          return;
        }
        throw new Error(data.error || t.login.errorInvalid);
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !userName || !businessName) {
      setError(tLocal.errorRequired);
      return;
    }
    if (password !== confirmPassword) {
      setError(language === "pt" ? "As senhas não coincidem" : language === "es" ? "Las contraseñas no coinciden" : "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError(language === "pt" ? "A senha deve ter pelo menos 6 caracteres" : language === "es" ? "La contraseña debe tener al menos 6 caracteres" : "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantName: businessName,
          userName,
          email: email.toLowerCase().trim(),
          passwordRaw: password,
          role: "owner"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar cadastro.");
      }

      setMode("otp-verify");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setError(language === "pt" ? "Digite o código de 6 dígitos" : language === "es" ? "Ingrese el código de 6 dígitos" : "Enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), code: otpCode.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Código inválido.");
      }

      localStorage.setItem("vipercar_token", data.token);
      localStorage.setItem("vipercar_user", JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(tLocal.errorRequired);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao solicitar recuperação.");
      }

      setMode("otp-reset");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyResetOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setError(language === "pt" ? "Digite o código de 6 dígitos" : language === "es" ? "Ingrese el código de 6 dígitos" : "Enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), code: otpCode.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Código incorreto ou expirado.");
      }

      setMode("reset-password");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError(tLocal.errorRequired);
      return;
    }
    if (password !== confirmPassword) {
      setError(language === "pt" ? "As senhas não coincidem" : language === "es" ? "Las contraseñas no coinciden" : "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError(language === "pt" ? "A senha deve ter pelo menos 6 caracteres" : language === "es" ? "La contraseña debe tener al menos 6 caracteres" : "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), code: otpCode.trim(), passwordRaw: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao redefinir a senha.");
      }

      setSuccessMessage(tLocal.successReset);
      setMode("login");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viper-car-api.vercel.app";
      const response = await fetch(`${apiUrl}/auth/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao reenviar código.");
      }
      setSuccessMessage(language === "pt" ? "Código reenviado com sucesso!" : language === "es" ? "¡Código reenviado con éxito!" : "Code resent successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
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
        className="relative w-full max-w-md bg-modal-bg border border-modal-border rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden my-8 transition-colors duration-300"
      >
        {/* Ambient background light */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-card-bg text-text-secondary border border-card-border hover:text-text-primary hover:bg-card-bg/85 transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card-bg items-center justify-center shadow-2xl shadow-cyan-500/5 mb-4 border border-card-border overflow-hidden">
              <img
                src="/logo.png"
                alt="Viper Car Emblem"
                width={80}
                height={80}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary mb-2 tracking-tight">
              {mode === "login" && t.login.title}
              {mode === "register" && tLocal.registerTitle}
              {mode === "forgot" && tLocal.forgotTitle}
              {mode === "otp-verify" && tLocal.otpVerifyTitle}
              {mode === "otp-reset" && tLocal.otpResetTitle}
              {mode === "reset-password" && tLocal.resetTitle}
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm">
              {mode === "login" && t.login.subtitle}
              {mode === "register" && tLocal.registerSubtitle}
              {mode === "forgot" && tLocal.forgotSubtitle}
              {mode === "otp-verify" && `${tLocal.otpVerifySubtitle} ${email}`}
              {mode === "otp-reset" && `${tLocal.otpResetSubtitle} ${email}`}
              {mode === "reset-password" && tLocal.resetSubtitle}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-bold text-center mb-4"
            >
              {error}
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-xs font-bold text-center mb-4 flex items-center justify-center gap-2"
            >
              <CheckCircle size={14} />
              {successMessage}
            </motion.div>
          )}

          {/* Forms switcher */}
          {mode === "login" && (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
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
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
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
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                </div>
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setError(null); setSuccessMessage(null); }}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {t.login.forgotPassword}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold text-base shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
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
          )}

          {mode === "register" && (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {tLocal.userName} *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={tLocal.placeholderUserName}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {tLocal.businessName} *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <Building size={18} />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder={tLocal.placeholderBusinessName}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {t.login.email} *
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
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {t.login.password} *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.placeholderPassword}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-12 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2 px-1">
                    <div className="flex justify-between items-center mb-1 text-[10px] font-semibold">
                      <span className="text-text-secondary">{tLocal.strengthLabel}</span>
                      <span className={passwordStrength.color}>{passwordStrength.label}</span>
                    </div>
                    <div className="h-1 bg-slate-500/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.bg}`}
                        style={{
                          width:
                            passwordStrength.score === 0
                              ? "0%"
                              : passwordStrength.score <= 2
                                ? "33%"
                                : passwordStrength.score <= 4
                                  ? "66%"
                                  : "100%",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {tLocal.confirmPassword} *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.login.placeholderPassword}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-12 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold text-base shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  tLocal.btnRegister
                )}
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form className="space-y-4" onSubmit={handleForgotPasswordSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
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
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold text-base shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  tLocal.btnSendForgot
                )}
              </button>
            </form>
          )}

          {mode === "otp-verify" && (
            <form className="space-y-4" onSubmit={handleVerifyOtpSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  Código OTP (6 dígitos)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                    placeholder="XXXXXX"
                    maxLength={6}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-center font-bold tracking-widest text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold text-base shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  tLocal.btnVerifyOtp
                )}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="w-full bg-transparent border border-card-border hover:bg-white/5 text-text-primary py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
              >
                {tLocal.resendCode}
              </button>
            </form>
          )}

          {mode === "otp-reset" && (
            <form className="space-y-4" onSubmit={handleVerifyResetOtpSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  Código OTP de Recuperação
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                    placeholder="XXXXXX"
                    maxLength={6}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-center font-bold tracking-widest text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold text-base shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  tLocal.btnVerifyOtp
                )}
              </button>
            </form>
          )}

          {mode === "reset-password" && (
            <form className="space-y-4" onSubmit={handleResetPasswordSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {tLocal.resetTitle} *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.placeholderPassword}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-12 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2 px-1">
                    <div className="flex justify-between items-center mb-1 text-[10px] font-semibold">
                      <span className="text-text-secondary">{tLocal.strengthLabel}</span>
                      <span className={passwordStrength.color}>{passwordStrength.label}</span>
                    </div>
                    <div className="h-1 bg-slate-500/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.bg}`}
                        style={{
                          width:
                            passwordStrength.score === 0
                              ? "0%"
                              : passwordStrength.score <= 2
                                ? "33%"
                                : passwordStrength.score <= 4
                                  ? "66%"
                                  : "100%",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 ml-1">
                  {tLocal.confirmPassword} *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.login.placeholderPassword}
                    disabled={isLoading}
                    className="w-full bg-modal-input border border-modal-input-border rounded-2xl py-3 pl-12 pr-12 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold text-base shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  tLocal.btnResetSubmit
                )}
              </button>
            </form>
          )}

          {/* Social login divider for login/register modes */}
          {(mode === "login" || mode === "register") && (
            <div className="mt-5">
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute inset-x-0 h-px bg-card-border"></div>
                <span className="relative px-4 bg-modal-bg text-[10px] font-bold text-text-muted uppercase tracking-widest transition-colors duration-300">
                  {t.login.dividerOr}
                </span>
              </div>

              <button className="flex items-center justify-center gap-3 bg-card-bg border border-card-border py-2.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-xs font-semibold text-text-primary cursor-pointer w-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
            </div>
          )}

          {/* Footer switcher links */}
          <div className="mt-6 text-center text-xs text-text-muted">
            {mode === "login" && (
              <p>
                {t.login.noAccount}{" "}
                <button
                  type="button"
                  onClick={() => { setMode("register"); setError(null); setSuccessMessage(null); }}
                  className="font-bold text-text-primary hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {tLocal.registerTitle}
                </button>
              </p>
            )}

            {mode === "register" && (
              <p>
                {tLocal.alreadyHaveAccount}{" "}
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(null); setSuccessMessage(null); }}
                  className="font-bold text-text-primary hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {tLocal.loginNow}
                </button>
              </p>
            )}

            {(mode === "forgot" || mode === "otp-verify" || mode === "otp-reset" || mode === "reset-password") && (
              <button
                type="button"
                onClick={() => { setMode("login"); setError(null); setSuccessMessage(null); }}
                className="font-bold text-text-primary hover:text-cyan-400 transition-colors cursor-pointer"
              >
                ← {tLocal.backToLogin}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
