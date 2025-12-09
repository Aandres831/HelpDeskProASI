"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        });

        if (!res || res.error) {
        setErrorMsg("Invalid credentials");
        return;
        }

        const sess = await fetch("/api/auth/session");
        const data = await sess.json();

        if (data?.user?.role === "client") {
        router.push("/cliente/dashboard");
        } else if (data?.user?.role === "agent") {
        router.push("/agent/dashboard");
        } else {
        router.push("/login");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", width: 280, gap: 15 }}
        >
            <h2>Login</h2>
            <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            />
            <button type="submit">Login</button>

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </form>
        </div>
    );
}
