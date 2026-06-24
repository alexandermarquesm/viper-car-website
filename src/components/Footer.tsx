import React from "react";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 text-text-secondary py-16 border-t border-footer-border bg-footer-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/full_logo.png"
                alt="Viper Car Logo"
                width={155}
                height={40}
                className="h-10 w-auto object-contain dark:invert-0 invert"
              />
            </div>
            <p className="text-text-secondary text-sm max-w-sm mb-8 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-text-secondary border border-card-border hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-text-secondary border border-card-border hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-text-secondary border border-card-border hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-text-secondary border border-card-border hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-text-primary font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
              {t.footer.catProduct}
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkFeatures}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkPricing}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  {t.footer.linkApp}{" "}
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[9px] uppercase font-bold tracking-wider">
                    {t.footer.linkAppBadge}
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkWhatsApp}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkUpdates}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
              {t.footer.catSolutions}
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkWash}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkAesthetics}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkFleet}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkPartner}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
              {t.footer.catResources}
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkHelp}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkVideos}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkBlog}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.footer.linkSupport}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-footer-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p className="text-text-muted">
            &copy; {new Date().getFullYear()} Viper Car Tecnologia. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6 text-text-muted">
            <a href="#" className="hover:text-text-primary transition-colors">
              {t.footer.linkTerms}
            </a>
            <a href="#" className="hover:text-text-primary transition-colors">
              {t.footer.linkPrivacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
