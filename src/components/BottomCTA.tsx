import React from "react";
import { ArrowRight, Smartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function BottomCTA({ onSignUp }: { onSignUp: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative z-10 px-4 mb-16">
      <div className="max-w-6xl mx-auto bg-card-bg border border-card-border rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl group transition-colors duration-300">
        <div className="absolute top-[-50%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-colors duration-700"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-700"></div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary mb-6 leading-tight relative z-10">
          {t.cta.title}
        </h2>
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed tracking-wide">
          {t.cta.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10 items-center">
          <button
            onClick={onSignUp}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer active:scale-95 duration-200 text-center"
          >
            {t.cta.btnRegister}{" "}
            <ArrowRight
              size={20}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="https://github.com/alexandermarquesm/vip-car-website/releases/download/v2.0.6/viper-car-2.0.6.apk"
            download
            className="w-full sm:w-auto bg-bg hover:bg-slate-200 dark:hover:bg-slate-900 border border-card-border text-text-primary px-8 py-3 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-4 group hover:shadow-lg hover:shadow-cyan-500/5 active:scale-95 cursor-pointer"
          >
            <Smartphone
              size={24}
              className="text-cyan-400 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col items-start text-left leading-tight">
              <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">
                {t.cta.platform}
              </span>
              <span className="text-base font-bold flex items-center gap-1.5">
                {t.cta.btnDownload}{" "}
                <span className="text-[10px] font-normal text-text-muted bg-card-bg border border-card-border px-1.5 py-0.5 rounded group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                  v2.0.6
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
