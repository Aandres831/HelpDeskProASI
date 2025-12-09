"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./TicketAgentDetail.module.css";

export default function TicketAgentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params as { id: string };

    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadTicket = async () => {
        setLoading(true);
        const res = await fetch(`/api/tickets/${id}`);
        const data = await res.json();
        setTicket(data);
        setLoading(false);
    };

    const updateStatus = async (newStatus: string) => {
        await fetch(`/api/tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        await loadTicket(); // Recargar información después del update
    };

    useEffect(() => {
        if (id) loadTicket();
    }, [id]);

    if (loading || !ticket) {
        return <p style={{ padding: 20 }}>Loading ticket...</p>;
    }

    return (
        <div className={styles.container}>
            <h1>{ticket.title}</h1>

            <p>{ticket.description}</p>

            <p>
                <strong>Status: </strong>
                {ticket.status}
            </p>

            <p>
                <strong>Priority: </strong>
                {ticket.priority}
            </p>

            <p>
                <strong>Created At: </strong>
                {new Date(ticket.createdAt).toLocaleString()}
            </p>

            <div className={styles.buttonsWrapper}>
                <button
                    className={styles.actionButton}
                    onClick={() => updateStatus("open")}
                >
                    Open
                </button>

                <button
                    className={styles.actionButton}
                    onClick={() => updateStatus("in_progress")}
                >
                    In Progress
                </button>

                <button
                    className={styles.actionButton}
                    onClick={() => updateStatus("resolved")}
                >
                    Resolved
                </button>

                <button
                    className={styles.actionButton}
                    onClick={() => updateStatus("closed")}
                >
                    Closed
                </button>
            </div>

            <button
                className={styles.backButton}
                onClick={() => router.push("/agent/dashboard")}
            >
                Back to Dashboard
            </button>
        </div>
    );
}

