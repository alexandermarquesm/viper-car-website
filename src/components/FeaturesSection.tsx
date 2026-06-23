import React from "react";
import { motion } from "motion/react";
import {
  Car,
  Clock,
  Droplets,
  CheckCircle2,
  Camera,
  Database,
  Users,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="features"
      className="relative z-10 py-24 border-t border-card-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t.features.badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl mb-6">
            {t.features.title}
          </h2>
          <p className="text-lg text-text-secondary">
            {t.features.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-5xl mx-auto">
          {/* Main feature - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "var(--color-brand)",
              boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-2 md:row-span-2 bg-card-bg backdrop-blur-xl border border-card-border rounded-3xl p-8 transition-all group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="flex flex-col h-full z-10 relative">
              <div className="bg-cyan-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Car size={28} />
              </div>

              {/* Decorative Mock UI */}
              <div className="flex-1 w-full flex flex-col justify-center min-h-[240px] mb-8 pointer-events-none hidden sm:flex">
                <div className="w-full flex flex-col gap-3">
                  <div className="bg-bg/80 border border-card-border rounded-2xl p-4 flex items-center gap-4 w-[85%] transform -rotate-2 group-hover:-rotate-1 transition-transform duration-500">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                      <Clock size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-16 bg-text-secondary/40 rounded-full mb-2" />
                      <div className="h-2 w-24 bg-text-secondary/20 rounded-full" />
                    </div>
                    <div className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] uppercase font-bold rounded-lg tracking-widest">
                      {t.features.card1Badge}
                    </div>
                  </div>

                  <div className="bg-bg/80 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-4 w-[95%] ml-auto shadow-[0_0_15px_rgba(6,182,212,0.15)] transform translate-x-2 group-hover:translate-x-0 transition-transform duration-500 delay-75">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Droplets size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-20 bg-cyan-400 rounded-full mb-2" />
                      <div className="h-2 w-32 bg-cyan-500/30 rounded-full" />
                    </div>
                    <div className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] uppercase font-bold rounded-lg tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      {t.features.card1Active}
                    </div>
                  </div>

                  <div className="bg-bg/80 border border-card-border rounded-2xl p-4 flex items-center gap-4 w-[90%] transform rotate-1 group-hover:rotate-0 transition-transform duration-500 delay-150">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-24 bg-text-secondary/40 rounded-full mb-2" />
                      <div className="h-2 w-20 bg-text-secondary/20 rounded-full" />
                    </div>
                    <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] uppercase font-bold rounded-lg tracking-widest">
                      {t.features.card1Done}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                  {t.features.card1Title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  {t.features.card1Desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "rgba(236, 72, 153, 0.35)",
              boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-2 bg-card-bg backdrop-blur-xl border border-card-border rounded-3xl p-8 transition-all flex items-center justify-between gap-6 group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-6 relative z-10 w-full">
              <div className="bg-pink-500/10 min-w-[3.5rem] w-14 h-14 rounded-2xl flex items-center justify-center border border-pink-500/20 text-pink-400 shrink-0">
                <Camera size={26} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
                  {t.features.card2Title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
                  {t.features.card2Desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(168, 85, 247, 0.35)",
              boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card-bg backdrop-blur-xl border border-card-border rounded-3xl p-8 transition-all group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute -left-10 top-10 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 text-purple-400 shrink-0">
                <Database size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight">
                  {t.features.card3Title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t.features.card3Desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(249, 115, 22, 0.35)",
              boxShadow: "0 20px 40px -15px rgba(249, 115, 22, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card-bg backdrop-blur-xl border border-card-border rounded-3xl p-8 transition-all group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-orange-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 text-orange-400 shrink-0 relative z-10">
                <Users size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight relative z-10">
                  {t.features.card4Title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed relative z-10">
                  {t.features.card4Desc}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
