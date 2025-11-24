"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Cloud } from "lucide-react";
import { MessageList, Message } from "@/components/mailbox/message-list";
import { ComposeArea } from "@/components/mailbox/compose-area";
import { generateReply } from "@/lib/generation-engine";

export default function MailboxPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [petData, setPetData] = useState<any>(null);

    useEffect(() => {
        // Load pet data
        const savedPet = localStorage.getItem("pet_memory");
        if (savedPet) {
            setPetData(JSON.parse(savedPet));
        }

        // Load messages
        const savedMessages = localStorage.getItem("mailbox_messages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            // Initial welcome message if empty
            const initialMsg: Message = {
                id: "init-1",
                text: "铲屎官，这里虽然没有牛肉干，但是云朵是甜的哦！不要太想我，我会骄傲的。",
                sender: "pet",
                timestamp: Date.now() - 86400000, // Yesterday
            };
            setMessages([initialMsg]);
        }
    }, []);

    const saveMessages = (newMessages: Message[]) => {
        setMessages(newMessages);
        localStorage.setItem("mailbox_messages", JSON.stringify(newMessages));
    };

    const handleSend = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: Date.now(),
        };

        const newMessages = [...messages, userMsg];
        saveMessages(newMessages);

        // Simulate reply delay
        setIsTyping(true);

        if (petData) {
            generateReply(petData, text).then((replyText) => {
                const replyMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: replyText,
                    sender: "pet",
                    timestamp: Date.now(),
                };
                saveMessages([...newMessages, replyMsg]);
                setIsTyping(false);
            });
        } else {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-secondary/10">
            <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-border/50">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex flex-col items-center">
                    <h1 className="font-semibold text-sm">
                        {petData ? petData.name : "云端信箱"}
                    </h1>
                    {isTyping && (
                        <span className="text-[10px] text-primary animate-pulse flex items-center">
                            <Cloud className="w-3 h-3 mr-1" />
                            正在连接云端...
                        </span>
                    )}
                </div>
                <div className="w-6" /> {/* Spacer */}
            </header>

            <main className="flex-1 flex flex-col max-w-md w-full mx-auto h-[calc(100vh-60px)]">
                <MessageList messages={messages} />
                <ComposeArea onSend={handleSend} disabled={isTyping} />
            </main>
        </div>
    );
}
