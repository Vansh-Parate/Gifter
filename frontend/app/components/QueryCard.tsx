"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { UserCircleIcon, CompassIcon } from "./Icons";

interface QueryCardProps {
    onSubmit: (message: string) => Promise<void>;
    isLoading: boolean;
}

const MAX_CHARS = 200;
const MIN_CHARS = 20;

export default function QueryCard({ onSubmit, isLoading }: QueryCardProps) {
    const [message, setMessage] = useState("");

    const charCount = message.length;
    const isValid = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValid || isLoading) return;
        await onSubmit(message);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) {
            setMessage(value);
        }
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
            <div className="p-8 space-y-8">
                {/* Header - Centered */}
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                            <UserCircleIcon className="h-4 w-4" />
                        </span>
                        <p className="font-['Satoshi'] text-sm font-semibold text-slate-900">
                            Who are you gifting?
                        </p>
                    </div>
                    <p className="font-['Satoshi'] text-xs text-slate-500">
                        Mention their interests, occasion, and budget range.
                    </p>
                    <span className="font-['Satoshi'] text-xs text-slate-400 mt-2">
                        {charCount} / {MAX_CHARS}
                    </span>
                </div>

                {/* Textarea - Centered and narrower than container */}
                <div className="max-w-3xl mx-auto">
                    <textarea
                        value={message}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="font-['Satoshi'] block h-28 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 text-center outline-none transition-all placeholder:text-slate-400 placeholder:text-center focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20"
                        placeholder="e.g. My 30-year-old brother loves indie games, filter coffee, and hiking. Budget around $80."
                    />
                </div>

                {/* Validation Message */}
                {charCount > 0 && charCount < MIN_CHARS && (
                    <p className="text-center text-xs text-amber-600 animate-fade-in">
                        Please provide at least {MIN_CHARS} characters.
                    </p>
                )}
            </div>

            {/* Button Section - with top/bottom padding */}
            <div className="border-t border-slate-100 px-6 py-6">
                <div className="flex justify-center">
                    <button
                        onClick={(e) => handleSubmit(e as unknown as FormEvent)}
                        disabled={!isValid || isLoading}
                        className={`font-['Satoshi'] inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${!isValid || isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Finding...
                            </>
                        ) : (
                            <>
                                <CompassIcon className="h-4 w-4" />
                                Find gift ideas
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
