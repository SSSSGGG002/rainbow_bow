import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface StepSoulProps {
    data: {
        personality: string;
        favorites: string;
        fears: string;
    };
    onUpdate: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepSoul({ data, onUpdate, onNext, onBack }: StepSoulProps) {
    const isComplete = data.personality && data.favorites;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">它的灵魂</h2>
                <p className="text-muted-foreground">
                    这些细节会让它在云端记得自己是谁。
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        性格关键词
                    </label>
                    <Input
                        placeholder="例如：粘人、高冷、贪吃"
                        value={data.personality}
                        onChange={(e) => onUpdate({ personality: e.target.value })}
                        autoFocus
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        最爱的东西
                    </label>
                    <Input
                        placeholder="例如：牛肉干、那个破旧的球"
                        value={data.favorites}
                        onChange={(e) => onUpdate({ favorites: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        最怕的东西
                    </label>
                    <Input
                        placeholder="例如：吸尘器、打雷"
                        value={data.fears}
                        onChange={(e) => onUpdate({ fears: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" /> 返回
                </Button>
                <Button onClick={onNext} disabled={!isComplete} className="flex-[2]">
                    完成连接 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </motion.div>
    );
}
