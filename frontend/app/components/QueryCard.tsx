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
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="space-y-6">
                {/* Header with icon and character count */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-700 mt-0.5">
                            <UserCircleIcon className="h-4 w-4" />
                        </span>
                        <div className="text-left space-y-1">
                            <p className="font-['Satoshi'] text-base font-medium text-slate-900 tracking-tight">Who are you gifting?</p>
                            <p className="font-['Satoshi'] text-sm text-slate-500 leading-relaxed">
                                Mention their interests, occasion, and budget range.
                            </p>
                        </div>
                    </div>
                    <span className="font-['Satoshi'] text-xs text-slate-400 whitespace-nowrap pt-1">{charCount} / {MAX_CHARS}</span>
                </div>

                {/* Textarea with improved styling */}
                <div className="relative">
                    <textarea
                        value={message}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="font-['Satoshi'] block w-full min-h-[140px] resize-none rounded-xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10 disabled:bg-slate-50 disabled:cursor-not-allowed"
                        placeholder='e.g. "My 30-year-old brother loves indie games, filter coffee, and hiking. Budget around $80."'
                    />
                </div>

                {/* Validation message */}
                {charCount > 0 && charCount < MIN_CHARS && (
                    <p className="text-sm text-amber-600 font-['Satoshi']">
                        Please provide at least {MIN_CHARS} characters.
                    </p>
                )}

                {/* Submit button - centered with proper spacing */}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={(e) => handleSubmit(e as unknown as FormEvent)}
                        disabled={!isValid || isLoading}
                        className={`font-['Satoshi'] inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${!isValid || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
