import { Smartphone } from "lucide-react";

const MobileAppMarquee = () => {
  const message = "SIGNALHAIVE MOBILE APPLICATION COMING SOON";

  return (
    <section
      aria-label="Mobile application announcement"
      className="overflow-hidden border-y border-blue-500/20 bg-[#080B12] py-3"
    >
      <div className="flex w-max animate-marquee items-center">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            aria-hidden={item !== 0}
            className="flex shrink-0 items-center gap-4 px-6 text-sm font-semibold uppercase tracking-[0.15em] text-white sm:text-base"
          >
            <Smartphone
              size={19}
              className="shrink-0 text-[#208AEF]"
            />

            <span>{message}</span>

            <span className="text-[#208AEF]">✦</span>

            <span className="font-normal normal-case tracking-normal text-zinc-400">
              Your trading edge, coming to mobile.
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MobileAppMarquee;