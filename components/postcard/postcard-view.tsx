import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

interface PostcardViewProps {
    content: {
        imageUrl: string;
        message: string;
        date: string;
    };
    petName: string;
}

export function PostcardView({ content, petName }: PostcardViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg border border-border/50"
        >
            {/* Image Section */}
            <div className="relative h-64 w-full overflow-hidden">
                <img
                    src={content.imageUrl}
                    alt="Postcard from the cloud"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-muted-foreground flex items-center">
                    <Cloud className="w-3 h-3 mr-1 text-secondary" />
                    来自云端
                </div>
            </div>

            {/* Message Section */}
            <div className="p-6 space-y-4 relative">
                {/* Stamp/Date */}
                <div className="absolute top-6 right-6 text-xs text-muted-foreground/60 font-mono border border-muted-foreground/30 px-2 py-1 rounded rotate-[-5deg]">
                    {content.date}
                </div>

                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                        Hi, 铲屎官
                    </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm font-medium italic">
                    “{content.message}”
                </p>

                <div className="pt-4 flex justify-end">
                    <span className="text-sm font-handwriting text-primary">
                        —— 爱你的 {petName} 🐾
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
