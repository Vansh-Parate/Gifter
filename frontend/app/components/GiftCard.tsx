"use client";

import type { GiftSuggestion } from "../page";
import { DollarIcon, getCategoryIcon, getCategoryBadgeClass } from "./Icons";

interface GiftCardProps {
    suggestion: GiftSuggestion;
    index: number;
}

export default function GiftCard({ suggestion, index }: GiftCardProps) {
    const CategoryIcon = getCategoryIcon(index);
    const badgeClass = getCategoryBadgeClass(index);

    return (
        <article
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 animate-fade-in-up h-full"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Card Header */}
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${badgeClass}`}>
                        <CategoryIcon className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {suggestion.gift_name}
                    </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                    {suggestion.reason}
                </p>
            </div>

            {/* Card Footer */}
            <div className="mt-auto pt-4 border-t border-slate-100 space-y-4">
                {/* Price and Info */}
                <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
                        <DollarIcon className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">
                            {suggestion.price_range}
                        </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                        Easy to ship • Works for most ages
                    </p>
                </div>

                {/* Where to Buy */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Where to buy
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {suggestion.where_to_buy.map((store, storeIndex) => (
                            <a
                                key={storeIndex}
                                href={`https://www.google.com/search?q=${encodeURIComponent(store + " " + suggestion.gift_name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                            >
                                {store}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
