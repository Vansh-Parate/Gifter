"use client";

import { ShieldCheckIcon } from "./Icons";

export default function Footer() {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-4 animate-fade-in">
            <span>Powered by AI suggestions</span>
            <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Private by default</span>
                </span>
                <span className="hidden sm:inline">Thoughtful gifting for everyone</span>
            </div>
        </footer>
    );
}
