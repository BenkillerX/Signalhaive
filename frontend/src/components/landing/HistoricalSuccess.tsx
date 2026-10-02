const HistoricalSuccess = () => {
  return (
    <section className="relative overflow-hidden bg-white ">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800/30 blur-[140px]" />

      <div className="relative mx-auto">
        <div className="overflow-hidden border border-slate-800 bg-white px-6 py-14 text-center shadow-2xl sm:px-10 sm:py-20 lg:px-20">

          {/* Main statistic */}
          <h1 className="text-4xl font-bold tracking-[-0.06em] text-slate-700 sm:text-8xl lg:text-4xl lg:leading-none">
            79<span className="text-slate-500">%+</span>
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-xl font-semibold text-slate-600 sm:text-2xl">
            Historical Signal Success Rate
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Data-backed performance. Clearly defined signals. No guesswork.
          </p>

          {/* Disclaimer */}
          <div className="mx-auto max-w-3xl pt-6">
            <p className="text-xs leading-5 text-slate-500">
              Historical performance for the stated measurement period.
              Past performance does not guarantee future results. Results
              vary according to market conditions and execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoricalSuccess;