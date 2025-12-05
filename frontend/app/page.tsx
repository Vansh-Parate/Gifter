"use client";

import { useState } from "react";
import Header from "./components/Header";
import QueryCard from "./components/QueryCard";
import ResultsSection from "./components/ResultsSection";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

export interface GiftSuggestion {
  gift_name: string;
  reason: string;
  price_range: string;
  where_to_buy: string[];
}

export interface AgentResponse {
  suggestions: GiftSuggestion[];
  additional_notes: string;
}

export default function Home() {
  const [suggestions, setSuggestions] = useState<AgentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState("");

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    setLastMessage(message);

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_message: message }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to get suggestions");
      }

      const data: AgentResponse = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastMessage) {
      handleSubmit(lastMessage);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900 antialiased">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="w-full max-w-5xl space-y-6">
          {/* Header */}
          <Header />

          {/* Query Card */}
          <QueryCard onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Error Message */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50/90 p-4 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <span className="text-sm font-bold text-red-600">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">{error}</p>
                  <p className="text-xs text-red-600 mt-0.5">Please try again</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
              <LoadingSpinner />
            </div>
          )}

          {/* Results */}
          {suggestions && !isLoading && (
            <ResultsSection
              suggestions={suggestions}
              onRegenerate={handleRegenerate}
            />
          )}

          {/* Footer */}
          <div className="pt-4">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
