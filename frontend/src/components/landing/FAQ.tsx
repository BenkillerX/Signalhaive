import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is SignalHive?",
      answer:
        "SignalHive is a forex signal platform that helps traders monitor market opportunities through structured trading signals, real-time updates, and historical performance tracking.",
    },
    {
      question: "What information does a signal include?",
      answer:
        "Each signal provides the trading pair, direction, entry price, stop loss, take profit, and timeframe so you can clearly understand the setup.",
    },
    {
      question: "How quickly are new signals delivered?",
      answer:
        "Signals are published to the platform as soon as they become available. Users can monitor the Live Signals section and receive notifications when supported.",
    },
    {
      question: "Can I see previous signal performance?",
      answer:
        "Yes. SignalHive is designed to record completed signals so users can review historical outcomes and understand how previous signals performed.",
    },
    {
      question: "Does SignalHive execute trades for me?",
      answer:
        "No. SignalHive provides market information and trading signals. You remain responsible for deciding whether to enter a trade and for executing it through your chosen broker.",
    },
    {
      question: "Is SignalHive suitable for beginners?",
      answer:
        "SignalHive can help simplify the information presented around a trading setup, but users should understand forex trading and its risks before making real-money trading decisions.",
    },
    {
      question: "Does SignalHive guarantee profitable trades?",
      answer:
        "No. Past performance does not guarantee future results. Forex trading involves significant risk, and every signal can result in a loss.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            Questions, answered.
          </h2>
        </div>

        {/* FAQ List */}
        <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-semibold text-slate-900 sm:text-lg">
                    {faq.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors">
                    {isOpen ? (
                      <Minus size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-6 pr-12">
                    <p className="text-sm leading-7 text-slate-500 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Trading involves risk. SignalHive provides market information and
            signals and does not guarantee trading results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;