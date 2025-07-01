import { NextResponse } from "next/server";

export function apiErrorResponse(err, customMessage = "Internal Server Error", statusCode = 500) {
    const isDev = process.env.NODE_ENV === "development";
    const message = isDev ? err?.message || customMessage : customMessage;

    console.error("API Error:", err);

    return NextResponse.json({ error: message }, { status: statusCode });
}
