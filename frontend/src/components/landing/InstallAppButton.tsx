import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform?: string;
  }>;
}

const isPwaInstalled = (): boolean => {
  if (typeof window === "undefined") return false;

  const standalone = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;

  const iosStandalone =
    typeof navigator !== "undefined" &&
    "standalone" in navigator &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  return standalone || iosStandalone;
};

const InstallAppButton = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] = useState(isPwaInstalled);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Derive iOS detection instead of storing it in state.
  const isIOS =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1));

  useEffect(() => {
    const checkInstalled = () => {
      setIsInstalled(isPwaInstalled());
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    const mediaQuery = window.matchMedia("(display-mode: standalone)");

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener("appinstalled", handleAppInstalled);
    mediaQuery.addEventListener("change", checkInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
      mediaQuery.removeEventListener("change", checkInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!installPrompt) {
      alert(
        "To install SignalHaive, open your browser menu and select Install app or Add to Home Screen."
      );
      return;
    }

    await installPrompt.prompt();

    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  if (isInstalled || dismissed) return null;

  return (
    <>
      <div className="fixed bottom-6 right-5 z-50">
        <div className="relative">
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 rounded-full bg-[#208AEF] px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600"
          >
            <Download size={19} />
            Install App
          </button>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss install button"
            className="absolute -right-2 -top-2 rounded-full border border-zinc-700 bg-zinc-900 p-1 text-white"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {showIOSInstructions && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Install SignalHaive
              </h2>

              <button
                onClick={() => setShowIOSInstructions(false)}
                aria-label="Close instructions"
                className="text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-sm text-zinc-300">
              Add SignalHaive to your iPhone Home Screen for quick access:
            </p>

            <ol className="list-inside list-decimal space-y-3 text-sm text-zinc-200">
              <li>Open this page in Safari.</li>
              <li>
                Tap the Share icon (↑) at the bottom of the screen.
              </li>
              <li>Select Add to Home Screen.</li>
              <li>Tap Add to finish.</li>
            </ol>

            <button
              onClick={() => setShowIOSInstructions(false)}
              className="mt-6 w-full rounded-lg bg-[#208AEF] px-4 py-3 font-semibold text-white"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallAppButton;
