"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import styles from "./CreateTicket.module.css";

export default function CreateTicketPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium"
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const session = await getSession();

        const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            title: form.title,
            description: form.description,
            email: session?.user?.email,
            priority: form.priority
        })
        });

        if (res.ok) router.push("/cliente/dashboard");
    };

    return (
        <div className={styles.container}>
        <h2 className={styles.title}>Create Ticket</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
            <input
            type="text"
            placeholder="Title"
            required
            className={styles.input}
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <textarea
            placeholder="Description"
            required
            className={styles.textarea}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <select
            className={styles.select}
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value })}
            >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            </select>

            <button type="submit" className={styles.button}>Create</button>
        </form>
        </div>
    );
}

