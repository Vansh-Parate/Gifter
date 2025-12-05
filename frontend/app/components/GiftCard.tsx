"use client";

import type { GiftSuggestion } from "../page";
import { DollarIcon, getCategoryIcon } from "./Icons";

interface GiftCardProps {
    suggestion: GiftSuggestion;
    index: number;
}

export default function GiftCard({ suggestion, index }: GiftCardProps) {
    const CategoryIcon = getCategoryIcon(index);

    return (
        <article className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-md transition-all duration-200">
            {/* Icon and Price Row */}
            <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <CategoryIcon className="h-5 w-5 text-slate-700" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50">
                    <DollarIcon className="h-3.5 w-3.5 text-slate-600" />
                    <span className="font-satoshi text-sm font-medium text-slate-700">
                        {suggestion.price_range}
                    </span>
                </div>
            </div>

            {/* Title */}
            <h3 className="font-satoshi text-lg font-semibold text-slate-900 mb-2">
                {suggestion.gift_name}
            </h3>

            {/* Description */}
            <p className="font-satoshi text-sm text-slate-600 leading-relaxed mb-5">
                {suggestion.reason}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-100 mb-4"></div>

            {/* Where to Buy */}
            <div>
                <p className="font-satoshi text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
                    Where to buy
                </p>
                <div className="flex flex-wrap gap-2">
                    {suggestion.where_to_buy.map((store, storeIndex) => (
                        <span
                            key={storeIndex}
                            className="font-satoshi inline-flex items-center px-3 py-1.5 rounded-md bg-slate-50 text-xs text-slate-700 border border-slate-200"
                        >
                            {store}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
