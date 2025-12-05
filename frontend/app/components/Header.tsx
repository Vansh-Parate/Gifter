"use client";

import { GiftIcon } from "./Icons";

export default function Header() {
    return (
        <header className="flex flex-col gap-4 text-center py-4">
            <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-slate-200 bg-white/70 px-4 py-1 shadow-sm backdrop-blur">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M12 5v14M2 12h20" />
                        <path d="M12 5a3 3 0 1 1 3-3c0 1.657-3 3-3 3Z" />
                        <path d="M12 5a3 3 0 1 0-3-3c0 1.657 3 3 3 3Z" />
                    </svg>
                </span>
                <p className="font-['Satoshi'] text-xs font-medium uppercase tracking-[0.18em] text-slate-600">AI Gift Finder</p>
            </div>

            <div className="space-y-2">
                <h1 className="font-['Satoshi'] text-4xl tracking-tight font-semibold text-slate-900 sm:text-5xl">
                    Find thoughtful gifts in seconds
                </h1>
                <p className="font-['Satoshi'] text-base text-slate-600 sm:text-lg">
                    Describe who you’re buying for and let the assistant suggest personal, on-budget gift ideas.
                </p>
            </div>
        </header>
    );
}
