"use client";

import { Check, Copy, Gift, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { brandLogos } from "./config";

const PROVIDERS = ["noon", "talabat", "keeta"] as const;

const TIERS = [
  { minPct: 50, discount: 15, code: "EXAMPLE15%" },
  { minPct: 65, discount: 30, code: "EXAMPLE30%" },
  { minPct: 80, discount: 50, code: "EXAMPLE50%" },
];

export function FoodOffersCard({ adherence }: { adherence: number }) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const currentTier = [...TIERS].reverse().find((t) => adherence >= t.minPct);
  const activeTier = TIERS.find((t) => t.minPct === selectedTier) ?? null;

  const openModal = (minPct: number) => {
    setCopied(false);
    setSelectedTier(minPct);
  };

  const closeModal = () => {
    setCopied(false);
    setSelectedTier(null);
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="bento-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-amber-50 border-2 border-slate-900 flex items-center justify-center">
          <Gift className="w-4 h-4 text-amber-500" />
        </div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Food &amp; Beverage Offers
        </h3>
      </div>
      <p className="text-[10px] font-semibold text-slate-400 mb-3.5">
        Higher adherence = bigger discounts on noon, talabat &amp; keeta
      </p>

      <div className="flex flex-col gap-2.5">
        {TIERS.map((tier) => {
          const unlocked = adherence >= tier.minPct;
          const isCurrent = currentTier?.minPct === tier.minPct;
          return (
            <div
              key={tier.minPct}
              className={`flex items-center gap-3 rounded-xl border-2 border-slate-900 p-2.5 ${
                unlocked ? "bg-white" : "bg-slate-50 opacity-70"
              } ${isCurrent ? "ring-2 ring-hg-green/60" : ""}`}
            >
              <div
                className={`w-14 h-12 rounded-lg border-2 border-slate-900 flex flex-col items-center justify-center shrink-0 ${
                  unlocked ? "bg-amber-400" : "bg-slate-200"
                }`}
              >
                <span className="text-sm font-black text-slate-900 leading-none">
                  {tier.discount}%
                </span>
                <span className="text-[8px] font-black text-slate-700 tracking-widest mt-0.5">
                  OFF
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-slate-900 truncate">
                  {tier.discount}% off all orders
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {PROVIDERS.map((brand) => (
                    <Image
                      key={brand}
                      src={brandLogos[brand]}
                      alt={`${brand} logo`}
                      width={34}
                      height={14}
                      className={`max-h-3.5 max-w-[34px] object-contain ${
                        unlocked ? "" : "grayscale opacity-60"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {unlocked ? (
                <button
                  type="button"
                  onClick={() => openModal(tier.minPct)}
                  aria-label={`View ${tier.discount}% discount code`}
                  className="text-[9px] font-black text-emerald-700 bg-emerald-50 border-2 border-emerald-600 px-2 py-1 rounded-full shrink-0 transition-all hover:bg-emerald-100 active:scale-95 cursor-pointer"
                >
                  Unlocked
                </button>
              ) : (
                <span className="text-[9px] font-black text-slate-400 bg-slate-100 border-2 border-slate-300 px-2 py-1 rounded-full shrink-0">
                  {tier.minPct}%+
                </span>
              )}
            </div>
          );
        })}
      </div>

      {activeTier && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close discount code"
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in cursor-pointer"
          />
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-slate-900 bg-white shadow-[6px_6px_0_0_#0f172a] p-6 animate-slide-up-modal">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close discount code"
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center">
              <Gift className="w-6 h-6 text-slate-900" />
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900 tracking-tight">
              {activeTier.discount}% off all orders
            </h3>
            <p className="mt-1 text-[11px] font-semibold text-slate-500">
              Show this code at checkout on noon, talabat &amp; keeta
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 px-3 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">
                Code
              </span>
              <span className="flex-1 text-center text-lg font-black tracking-widest text-slate-900 truncate">
                {activeTier.code}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(activeTier.code)}
                aria-label="Copy discount code"
                className={`p-2 rounded-lg border-2 transition-all active:scale-95 shrink-0 ${
                  copied
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                    : "bg-white border-slate-900 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.6} />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {PROVIDERS.map((brand) => (
                <div
                  key={brand}
                  className="flex-1 rounded-lg border-2 border-slate-900 bg-white flex items-center justify-center py-2"
                >
                  <Image
                    src={brandLogos[brand]}
                    alt={`${brand} logo`}
                    width={48}
                    height={18}
                    className="max-h-4.5 max-w-[48px] object-contain"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="mt-5 w-full rounded-xl border-2 border-slate-900 gradient-hg text-white px-4 py-3 text-sm font-black shadow-[3px_3px_0_0_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
