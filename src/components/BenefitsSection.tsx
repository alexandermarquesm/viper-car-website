import React from "react";
import { motion } from "motion/react";
import { Clock, TrendingUp, MessageCircle, Crown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function BenefitsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 py-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-6 tracking-tight">
            {t.benefits.title}
          </h2>
          <p className="text-text-secondary text-lg">
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "var(--color-brand)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-2 bg-card-bg border border-card-border rounded-[2rem] p-8 lg:p-12 overflow-hidden relative group transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <Clock className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                {t.benefits.card1Title}
              </h3>
              <p className="text-text-secondary text-base leading-relaxed max-w-md">
                {t.benefits.card1Desc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(99, 102, 241, 0.35)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card-bg border border-card-border rounded-[2rem] p-8 lg:p-10 relative group hover:border-indigo-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <TrendingUp className="text-indigo-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                {t.benefits.card2Title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t.benefits.card2Desc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(16, 185, 129, 0.35)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card-bg border border-card-border rounded-[2rem] p-8 lg:p-10 relative group hover:border-emerald-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <MessageCircle className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                {t.benefits.card3Title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t.benefits.card3Desc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "rgba(236, 72, 153, 0.35)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-2 bg-card-bg border border-card-border rounded-[2rem] p-8 lg:p-12 overflow-hidden relative group transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full group-hover:bg-pink-500/20 transition-colors" />
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/20">
                <Crown className="text-pink-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                {t.benefits.card4Title}
              </h3>
              <p className="text-text-secondary text-base leading-relaxed max-w-md">
                {t.benefits.card4Desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
