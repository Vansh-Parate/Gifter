import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface GiftRequest {
    user_message: string;
    context?: Record<string, string>;
}

export async function POST(request: NextRequest) {
    try {
        const body: GiftRequest = await request.json();

        // Validate request
        if (!body.user_message || body.user_message.length < 20) {
            return NextResponse.json(
                { detail: "Message must be at least 20 characters" },
                { status: 400 }
            );
        }

        // Forward request to FastAPI backend
        const response = await fetch(`${BACKEND_URL}/api/suggest-gift`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                detail: "Backend service unavailable",
            }));
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("API route error:", error);

        // Check if it's a connection error to the backend
        if (error instanceof TypeError && error.message.includes("fetch")) {
            return NextResponse.json(
                { detail: "Unable to connect to gift suggestion service" },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { detail: "Internal server error" },
            { status: 500 }
        );
    }
}
