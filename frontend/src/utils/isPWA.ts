export const isPWA = (): boolean => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in window &&
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true)
  );
};