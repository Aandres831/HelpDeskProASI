"use client";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";

export default function ClienteDashboardPage() {
    const [sessionData, setSessionData] = useState<any>(null);
    const [tickets, setTickets] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadSessionAndTickets = async () => {
        const sess = await getSession();
        setSessionData(sess);

        if (sess?.user?.email) {
            const res = await fetch(`/api/tickets?email=${sess.user.email}`);
            const data = await res.json();
            setTickets(data);
        }
        };

        loadSessionAndTickets();
    }, []);

    if (!sessionData) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
        <div className={styles.header}>
            <p className={styles.welcomeText}>
            Welcome {sessionData?.user?.name}
            </p>

            <button
            className={styles.primaryButton}
            onClick={() => router.push("/cliente/create-ticket")}
            >
            Create Ticket
            </button>
        </div>

        <h3 className={styles.sectionTitle}>Your Tickets</h3>

        {tickets.length === 0 && (
            <p>No tickets created yet.</p>
        )}

        <div className={styles.ticketsList}>
            {tickets.map(ticket => (
            <div
                key={ticket._id}
                className={styles.ticketCard}
                onClick={() => router.push(`/cliente/ticket/${ticket._id}`)}
            >
                <h3 className={styles.ticketTitle}>{ticket.title}</h3>

                <p className={styles.ticketMeta}>
                {ticket.description.length > 60
                    ? ticket.description.substring(0, 60) + "..."
                    : ticket.description}
                </p>

                <div className={styles.infoRow}>
                <span className={`${styles.badge} ${styles[ticket.priority]}`}>
                    {ticket.priority}
                </span>

                <span className={styles.status}>
                    {ticket.status}
                </span>
                </div>

                <span className={styles.date}>
                {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
            </div>
            ))}
        </div>
        </div>
    );
}
