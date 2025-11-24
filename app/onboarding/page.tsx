import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wizard } from "@/components/onboarding/wizard";

export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col p-6 bg-secondary/5">
            <header className="mb-8">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
            </header>

            <main className="flex-1 w-full flex flex-col items-center justify-center pb-12">
                <Wizard />
            </main>
        </div>
    );
}
