"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { StepIdentity } from "./step-identity";
import { StepSoul } from "./step-soul";

export interface OnboardingData {
    name: string;
    breed: string;
    passingDate: string;
    personality: string;
    favorites: string;
    fears: string;
}

const INITIAL_DATA: OnboardingData = {
    name: "",
    breed: "",
    passingDate: "",
    personality: "",
    favorites: "",
    fears: "",
};

export function Wizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<OnboardingData>(INITIAL_DATA);

    const updateData = (newData: Partial<OnboardingData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleComplete = () => {
        // Save to localStorage for MVP
        localStorage.setItem("pet_memory", JSON.stringify(formData));
        // Redirect to home
        router.push("/");
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-card rounded-2xl shadow-sm border border-border/50">
            <div className="mb-8 flex justify-center space-x-2">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : "w-2 bg-muted"
                            }`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <StepIdentity
                        key="step1"
                        data={formData}
                        onUpdate={updateData}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && (
                    <StepSoul
                        key="step2"
                        data={formData}
                        onUpdate={updateData}
                        onNext={handleComplete}
                        onBack={handleBack}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
