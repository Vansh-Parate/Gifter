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
        <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur-sm animate-fade-in-up">
            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
                        <SparklesIcon className="h-4 w-4" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Perfect gift ideas
                        </h2>
                        <p className="text-sm text-slate-500">
                            Curated suggestions based on your description.
                        </p>
                    </div>
                </div>

                {onRegenerate && (
                    <button
                        onClick={onRegenerate}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                        <RefreshIcon className="h-3.5 w-3.5" />
                        Regenerate ideas
                    </button>
                )}
            </div>

            {/* Gift Cards Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {suggestions.suggestions.map((suggestion, index) => (
                    <GiftCard key={index} suggestion={suggestion} index={index} />
                ))}
            </div>
        </section>
    );
}
