"use client";

import { ShieldCheckIcon } from "./Icons";

export default function Footer() {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span className="font-['Satoshi']">Powered by AI suggestions</span>
            <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="font-['Satoshi']">Private by default</span>
                </span>
                <span className="font-['Satoshi']">Thoughtful gifting for everyone</span>
            </div>
        </footer>
    );
}
