import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role) {
        return NextResponse.redirect("http://localhost:3000/login");
    }

    if (session.user.role === "client") {
        return NextResponse.redirect("http://localhost:3000/client/dashboard");
    }

    if (session.user.role === "agent") {
        return NextResponse.redirect("http://localhost:3000/agent/dashboard");
    }

    return NextResponse.redirect("http://localhost:3000/login");
}
