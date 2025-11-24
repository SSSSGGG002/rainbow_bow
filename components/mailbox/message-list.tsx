import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Message {
    id: string;
    text: string;
    sender: "user" | "pet";
    timestamp: number;
}

interface MessageListProps {
    messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={cn(
                            "flex w-full",
                            msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed",
                                msg.sender === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-white text-foreground rounded-tl-none border border-border/50"
                            )}
                        >
                            <p>{msg.text}</p>
                            <span
                                className={cn(
                                    "text-[10px] mt-1 block opacity-70",
                                    msg.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                                )}
                            >
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div ref={bottomRef} />
        </div>
    );
}
