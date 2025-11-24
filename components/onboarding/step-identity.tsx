import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StepIdentityProps {
    data: {
        name: string;
        breed: string;
        passingDate: string;
    };
    onUpdate: (data: any) => void;
    onNext: () => void;
}

export function StepIdentity({ data, onUpdate, onNext }: StepIdentityProps) {
    const isComplete = data.name && data.breed && data.passingDate;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">它是谁？</h2>
                <p className="text-muted-foreground">
                    告诉我们它的名字，让我们能找到它。
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        名字
                    </label>
                    <Input
                        placeholder="例如：旺财、咪咪"
                        value={data.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        autoFocus
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        品种
                    </label>
                    <Input
                        placeholder="例如：金毛、狸花猫"
                        value={data.breed}
                        onChange={(e) => onUpdate({ breed: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        它离开的日子
                    </label>
                    <Input
                        type="date"
                        value={data.passingDate}
                        onChange={(e) => onUpdate({ passingDate: e.target.value })}
                    />
                </div>
            </div>

            <div className="pt-4">
                <Button
                    onClick={onNext}
                    disabled={!isComplete}
                    className="w-full"
                >
                    下一步 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </motion.div>
    );
}
