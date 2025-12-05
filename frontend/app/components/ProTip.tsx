"use client";

import { LightbulbIcon, PenIcon } from "./Icons";

interface ProTipProps {
    tip: string;
    onGenerateNote?: () => void;
}

export default function ProTip({ tip, onGenerateNote }: ProTipProps) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-900 px-4 py-3 text-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-5 animate-fade-in-up">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/90 text-slate-900">
                    <LightbulbIcon className="h-4 w-4" />
                </span>
                <div className="space-y-1">
                    <p className="text-sm tracking-tight font-medium text-slate-50">
                        Pro tip
                    </p>
                    <p className="text-sm text-slate-200">
                        {tip}
                    </p>
                </div>
            </div>

            {onGenerateNote && (
                <button
                    onClick={onGenerateNote}
                    className="inline-flex items-center gap-1.5 self-start rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-700 transition-colors"
                >
                    <PenIcon className="h-3.5 w-3.5" />
                    Generate a note
                </button>
            )}
        </div>
    );
}
