import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComposeAreaProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

export function ComposeArea({ onSend, disabled }: ComposeAreaProps) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim() && !disabled) {
            onSend(text.trim());
            setText("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 bg-white border-t border-border/50">
            <div className="relative flex items-end gap-2">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="写封信给它..."
                    disabled={disabled}
                    className="flex-1 min-h-[50px] max-h-[150px] p-3 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    rows={1}
                />
                <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!text.trim() || disabled}
                    className="rounded-full h-10 w-10 shrink-0 mb-0.5"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
