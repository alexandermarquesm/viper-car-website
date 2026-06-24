import React, { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  ArrowLeft,
  Zap,
  ExternalLink,
  User,
  Crown,
  Calendar,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ProfileModal({
  user,
  onClose,
  onLogout,
  onManageSubscription,
  onSubscribe,
}: {
  user: any;
  onClose: () => void;
  onLogout: () => void;
  onManageSubscription: () => void;
  onSubscribe: (plan: "basic" | "pro") => void;
}) {
  const { t, language } = useLanguage();
  const [showPlans, setShowPlans] = useState(false);
  const tenantPlan = user.tenant?.plan;
  const tenantVariant = user.tenant?.variantId;

  let planName = t.profile.planBasic;
  let planColor = "from-cyan-500 to-blue-600";
  let crownColor = "text-cyan-400";

  if (
    tenantVariant === "pro" ||
    tenantPlan === "advanced" ||
    tenantVariant === "advanced"
  ) {
    planName = t.profile.planPro;
    planColor = "from-amber-500 to-orange-600";
    crownColor = "text-amber-400";
  } else if (tenantPlan === "trial") {
    planName = t.profile.planTrial;
    planColor = "from-slate-500 to-slate-700";
    crownColor = "text-slate-400";
  }

  const isTrial = tenantPlan === "trial";
  const isCourtesy =
    !isTrial &&
    !user.tenant?.externalSubscriptionId &&
    !user.tenant?.externalCustomerId;

  const expirationDate = isTrial
    ? user.tenant?.trialEndsAt
    : user.tenant?.currentPeriodEnd;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const localeMap = {
      pt: "pt-BR",
      en: "en-US",
      es: "es-ES",
    };
    const locale = localeMap[language] || "pt-BR";
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none`}
        />

        <div className="relative z-10 p-8 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-card-bg text-text-secondary border border-card-border hover:text-text-primary hover:bg-card-bg/85 transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>

          {showPlans ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setShowPlans(false)}
                  className="p-1.5 rounded-xl bg-card-bg text-text-secondary hover:text-text-primary hover:bg-card-bg/85 border border-card-border transition-all cursor-pointer"
                  aria-label="Voltar"
                >
                  <ArrowLeft size={16} />
                </button>
                <h2 className="text-xl font-display font-bold text-text-primary tracking-tight">
                  {t.profile.planChoose}
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {/* Basic Option */}
                <button
                  onClick={() => onSubscribe("basic")}
                  className="w-full bg-modal-input hover:bg-slate-200 dark:hover:bg-white/10 border border-modal-input-border rounded-3xl p-5 text-left flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{t.profile.planBasic}</h3>
                    <p className="text-text-secondary text-xs">
                      {t.profile.planBasicDesc}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-cyan-400 block">
                      R$ 49,90
                    </span>
                    <span className="text-[10px] text-text-muted">{t.pricing.basicPriceSub}</span>
                  </div>
                </button>

                {/* Pro Option */}
                <button
                  onClick={() => onSubscribe("pro")}
                  className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-3xl p-5 text-left flex items-center justify-between transition-all group cursor-pointer relative"
                >
                  <div className="absolute top-0 right-12 -translate-y-1/2 bg-indigo-500 text-white px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider">
                    {t.pricing.proBadge}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1 flex items-center gap-1.5">
                      {t.profile.planPro}{" "}
                      <Zap
                        size={12}
                        className="text-amber-400 fill-amber-400"
                      />
                    </h3>
                    <p className="text-indigo-200 text-xs">
                      {t.profile.planProDesc}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-indigo-400 block">
                      R$ 89,90
                    </span>
                    <span className="text-[10px] text-indigo-200/60">{t.pricing.proPriceSub}</span>
                  </div>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById("pricing");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }}
                className="w-full py-4 bg-card-bg hover:bg-slate-200 dark:hover:bg-white/10 text-text-secondary hover:text-text-primary rounded-2xl font-bold text-xs transition-all border border-card-border text-center cursor-pointer flex items-center justify-center gap-2 group"
              >
                {t.profile.btnPlanDetails}{" "}
                <ExternalLink
                  size={14}
                  className="text-text-muted group-hover:text-cyan-400 transition-colors"
                />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div
                  className={`inline-flex w-20 h-20 bg-gradient-to-br ${planColor} rounded-3xl items-center justify-center shadow-xl text-white mb-6 transform -rotate-3`}
                >
                  <User size={40} strokeWidth={2} />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary mb-1 tracking-tight">
                  {user.name}
                </h2>
                <p className="text-text-secondary text-sm">{user.email}</p>
              </div>

              <div className="space-y-4 mb-10">
                {/* Plan Info Card */}
                <div className="bg-modal-input border border-modal-input-border rounded-3xl p-6 relative overflow-hidden group">
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${planColor} opacity-5 blur-[40px] pointer-events-none`}
                  />

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">
                        {t.profile.subscriptionStatus}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-text-primary tracking-tight">
                          {planName}
                        </span>
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {t.profile.statusActive}
                        </span>
                      </div>
                    </div>
                    <div className="bg-card-bg p-2 rounded-xl border border-card-border">
                      <Crown size={20} className={crownColor} />
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} className="text-text-muted" />
                      <span className="text-text-secondary">
                        {t.profile.expiresAt}{" "}
                        <strong className="text-text-primary font-semibold">
                          {formatDate(expirationDate)}
                        </strong>
                      </span>
                    </div>
                    {isTrial ? (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-text-muted" />
                        <span className="text-text-secondary">
                          {t.profile.statusTrial}
                        </span>
                      </div>
                    ) : isCourtesy ? (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-amber-400" />
                        <span className="text-text-secondary">
                          {t.profile.statusCourtesy}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-text-secondary">
                          {t.profile.statusRenews}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {tenantPlan === "monthly" && (
                  <button
                    onClick={onManageSubscription}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/30 group cursor-pointer"
                  >
                    {t.profile.btnManage}{" "}
                    <ExternalLink
                      size={18}
                      className="text-indigo-200 group-hover:text-white transition-colors"
                    />
                  </button>
                )}

                {tenantPlan === "trial" && (
                  <button
                    onClick={() => setShowPlans(true)}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-500/30 group cursor-pointer"
                  >
                    {t.profile.btnSubscribeVip}{" "}
                    <ExternalLink
                      size={18}
                      className="text-cyan-100 group-hover:text-white transition-colors"
                    />
                  </button>
                )}

                <a
                  href="https://viper-car-app.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-card-bg hover:bg-slate-200 dark:hover:bg-white/10 text-text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-card-border group cursor-pointer"
                >
                  {t.profile.btnDashboard}{" "}
                  <ExternalLink
                    size={18}
                    className="text-text-muted group-hover:text-cyan-400 transition-colors"
                  />
                </a>
              </div>

              <button
                onClick={onLogout}
                className="w-full py-4 text-text-muted hover:text-red-400 font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={18} /> {t.profile.btnLogout}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
