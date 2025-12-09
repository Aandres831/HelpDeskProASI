"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import styles from "./TicketDetail.module.css";

export default function TicketDetailPage() {
    const params = useParams();
    const { id } = params as { id: string };

    const [ticket, setTicket] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [input, setInput] = useState("");

    // Load ticket
    const loadTicket = async () => {
        const res = await fetch(`/api/tickets/${id}`);
        const data = await res.json();
        setTicket(data);
    };

    // Load comments
    const loadComments = async () => {
        const res = await fetch(`/api/comments?ticketId=${id}`);
        const data = await res.json();
        setComments(data);
    };

    // Initial load
    useEffect(() => {
        if (id) {
            loadTicket();
            loadComments();
        }
    }, [id]);

    // Submit comment
    const handleSubmit = async () => {
    const session: any = await getSession();

    if (!session?.user?.id) {
        alert("Session expired, please login again");
        return;
    }

    await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ticketId: id,
            message: input,
            userId: session.user.id, // AHORA SI ESTÁ
        }),
    });

    setInput("");
    loadComments();
};


    if (!ticket) return <p className={styles.loading}>Loading...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{ticket.title}</h1>

            <p className={styles.description}>{ticket.description}</p>

            <div className={styles.details}>
                <span className={`${styles.badge} ${styles[ticket.priority]}`}>
                    {ticket.priority}
                </span>

                <span className={styles.label}>
                    Status: <strong>{ticket.status}</strong>
                </span>

                <span className={styles.label}>
                    Created At:{" "}
                    <strong>{new Date(ticket.createdAt).toLocaleString()}</strong>
                </span>
            </div>

            <h3 className={styles.commentsTitle}>Comments</h3>

            <div className={styles.comments}>
                {comments.map((c) => (
                    <div key={c._id} className={styles.commentBox}>
                        <strong>{c.createdBy?.name ?? "User"}:</strong>
                        <p>{c.message}</p>
                        <span className={styles.commentDate}>
                            {new Date(c.createdAt).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <textarea
                className={styles.inputArea}
                placeholder="Write a comment..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleSubmit} className={styles.button}>
                Send Comment
            </button>
        </div>
    );
}

