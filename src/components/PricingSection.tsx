import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function PricingSection({
  user,
  onSubscribe,
  onManageSubscription,
}: {
  user: any;
  onSubscribe: (plan: "basic" | "pro") => void;
  onManageSubscription: () => void;
}) {
  const { t } = useLanguage();
  const tenantPlan = user?.tenant?.plan;
  const tenantVariant = user?.tenant?.variantId;
  const hasActiveSub =
    tenantPlan === "monthly" && user?.tenant?.subscriptionStatus === "active";

  const renderBasicButton = () => {
    if (!user) {
      return (
        <button
          onClick={() => onSubscribe("basic")}
          className="w-full bg-bg hover:bg-slate-200 dark:hover:bg-white/10 text-text-primary border border-card-border px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide cursor-pointer"
        >
          {t.pricing.basicBtn}
        </button>
      );
    }

    if (hasActiveSub) {
      if (tenantVariant === "basic" || !tenantVariant) {
        return (
          <button
            disabled
            className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-4 rounded-2xl font-bold mt-auto tracking-wide cursor-not-allowed"
          >
            {t.pricing.currentPlan}
          </button>
        );
      }
      return (
        <button
          onClick={onManageSubscription}
          className="w-full bg-bg hover:bg-slate-200 dark:hover:bg-white/10 text-text-primary border border-card-border px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide cursor-pointer"
        >
          {t.pricing.managePlan}
        </button>
      );
    }

    return (
      <button
        onClick={() => onSubscribe("basic")}
        className="w-full bg-bg hover:bg-slate-200 dark:hover:bg-white/10 text-text-primary border border-card-border px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide cursor-pointer"
      >
        {t.pricing.basicBtn}
      </button>
    );
  };

  const renderProButton = () => {
    if (!user) {
      return (
        <button
          onClick={() => onSubscribe("pro")}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide border border-indigo-500 shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          {t.pricing.proBtn}
        </button>
      );
    }

    if (hasActiveSub) {
      if (tenantVariant === "pro") {
        return (
          <button
            disabled
            className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-4 rounded-2xl font-bold mt-auto tracking-wide cursor-not-allowed"
          >
            {t.pricing.currentPlan}
          </button>
        );
      }
      return (
        <button
          onClick={onManageSubscription}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide border border-indigo-500 shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          {t.pricing.proUpgradeBtn}
        </button>
      );
    }

    return (
      <button
        onClick={() => onSubscribe("pro")}
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide border border-indigo-500 shadow-lg shadow-indigo-500/20 cursor-pointer"
      >
        {t.pricing.proBtn}
      </button>
    );
  };

  return (
    <section
      id="pricing"
      className="py-32 text-text-primary relative z-10 border-t border-card-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t.pricing.badge}
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-text-secondary">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.01,
              borderColor: "var(--color-brand)",
              boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card-bg border border-card-border rounded-3xl p-10 flex flex-col transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-3 tracking-tight">{t.pricing.basicTitle}</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                {t.pricing.basicDesc}
              </p>
              <div className="mb-8">
                <span className="text-5xl font-black text-text-primary tracking-tight">
                  {t.pricing.basicPrice}
                </span>
                <span className="text-text-muted font-medium">{t.pricing.basicPriceSub}</span>
              </div>

              <ul className="flex flex-col gap-5 mb-10 flex-1">
                <li className="flex items-start gap-4 text-text-secondary text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20">
                    <Check size={14} className="text-cyan-400" />
                  </div>{" "}
                  {t.pricing.basicFeature1}
                </li>
                <li className="flex items-start gap-4 text-text-secondary text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20">
                    <Check size={14} className="text-cyan-400" />
                  </div>{" "}
                  {t.pricing.basicFeature2}
                </li>
                <li className="flex items-start gap-4 text-text-secondary text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20">
                    <Check size={14} className="text-cyan-400" />
                  </div>{" "}
                  {t.pricing.basicFeature3}
                </li>
                <li className="flex items-start gap-4 text-text-secondary text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20">
                    <Check size={14} className="text-cyan-400" />
                  </div>{" "}
                  {t.pricing.basicFeature4}
                </li>
                <li className="flex items-start gap-4 text-text-secondary text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20">
                    <Check size={14} className="text-cyan-400" />
                  </div>{" "}
                  {t.pricing.basicFeature5}
                </li>
                <li className="flex items-start gap-4 text-text-secondary text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20">
                    <Check size={14} className="text-cyan-400" />
                  </div>{" "}
                  {t.pricing.basicFeature6}
                </li>
              </ul>

              {renderBasicButton()}
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -12,
              scale: 1.015,
              borderColor: "rgba(99, 102, 241, 0.5)",
              boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-10 flex flex-col relative lg:-translate-y-4 shadow-2xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-500" />
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-3xl font-bold tracking-tight">{t.pricing.proTitle}</h3>
                <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {t.pricing.proBadge}
                </span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t.pricing.proDesc}
              </p>
              <div className="mb-8">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 tracking-tight">
                  {t.pricing.proPrice}
                </span>
                <span className="text-slate-400 font-medium">{t.pricing.proPriceSub}</span>
              </div>

              <ul className="flex flex-col gap-5 mb-10 flex-1">
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature1}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature2}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature3}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature4}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature5}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature6}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature7}
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30">
                    <Check size={14} className="text-indigo-400" />
                  </div>{" "}
                  {t.pricing.proFeature8}
                </li>
              </ul>

              {renderProButton()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
