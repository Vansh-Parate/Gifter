"use client";

import type { AgentResponse } from "../page";
import { SparklesIcon, RefreshIcon } from "./Icons";
import GiftCard from "./GiftCard";

interface ResultsSectionProps {
    suggestions: AgentResponse;
    onRegenerate?: () => void;
}

export default function ResultsSection({ suggestions, onRegenerate }: ResultsSectionProps) {
    return (
        <section className="space-y-6">
            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30"></div>
                        <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                            <SparklesIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Perfect gift ideas
                        </h2>
                        <p className="font-satoshi text-sm sm:text-base text-slate-600 mt-1">
                            Curated suggestions based on your description
                        </p>
                    </div>
                </div>

                {onRegenerate && (
                    <button
                        onClick={onRegenerate}
                        className="font-satoshi inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                        aria-label="Regenerate gift ideas"
                    >
                        <RefreshIcon className="h-4 w-4" />
                        <span>Regenerate ideas</span>
                    </button>
                )}
            </div>

            {/* Gift Cards Grid */}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.suggestions.map((suggestion, index) => (
                    <GiftCard key={index} suggestion={suggestion} index={index} />
                ))}
            </div>
        </section>
    );
}
