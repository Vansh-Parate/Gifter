export default function LoadingSpinner() {
    return (
        <div
            className="flex flex-col items-center justify-center gap-5 py-8"
            role="status"
            aria-label="Loading"
        >
            {/* Spinner Container */}
            <div className="relative w-16 h-16">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />

                {/* Spinning gradient ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-teal-500 animate-spin" />

                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 animate-pulse" />

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
            </div>

            {/* Loading text */}
            <div className="text-center space-y-1">
                <p className="text-lg font-medium text-slate-700 animate-pulse">
                    Finding perfect gifts...
                </p>
                <p className="text-sm text-slate-500">
                    Analyzing your description with AI
                </p>
            </div>

            {/* Animated dots */}
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce-dot"
                        style={{ animationDelay: `${i * 0.16}s` }}
                    />
                ))}
            </div>
        </div>
    );
}
