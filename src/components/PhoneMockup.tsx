import React from "react";

export function PhoneMockup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto rounded-[3rem] bg-slate-900 border-[10px] border-slate-900 shadow-2xl overflow-hidden w-[350px] h-[710px] sm:w-[370px] sm:h-[750px] flex-shrink-0 ring-1 ring-white/10 ${className}`}
    >
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-30 rounded-b-2xl mx-auto w-32 flex justify-center items-center gap-2">
        <div className="w-12 h-1.5 bg-slate-800 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
      </div>

      {/* Screen */}
      <div
        className="absolute inset-0 flex flex-col overflow-hidden rounded-[2.25rem] bg-[#0f172a]"
        style={{ isolation: "isolate", transform: "translateZ(0)" }}
      >
        {children}
      </div>
    </div>
  );
}

export function PhoneStatusBar({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = React.useState("09:41");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, "0");
      const mins = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const textColor = dark ? "text-slate-800" : "text-white";
  return (
    <div
      className={`absolute top-0 inset-x-0 h-6 flex justify-between items-center px-6 z-40 text-[9px] font-bold tracking-tight pointer-events-none select-none ${textColor}`}
    >
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <div className="flex items-end gap-[1px] h-2">
          <div className="w-[1.5px] h-[3px] bg-current rounded-full" />
          <div className="w-[1.5px] h-[4.5px] bg-current rounded-full" />
          <div className="w-[1.5px] h-[6px] bg-current rounded-full" />
          <div className="w-[1.5px] h-[7.5px] bg-current rounded-full" />
        </div>
        {/* Wifi */}
        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 21l-12-12c4.4-4.4 11.6-4.4 16 0l-4 4c-2.2-2.2-5.8-2.2-8 0l8 8z" />
        </svg>
        {/* Battery */}
        <div className="w-5 h-2.5 border border-current rounded-[3px] p-[1.5px] flex items-center gap-[0.5px]">
          <div className="h-full w-2.5 bg-current rounded-[0.5px]" />
          <div className="w-[0.5px] h-0.8 bg-current rounded-r" />
        </div>
      </div>
    </div>
  );
}
