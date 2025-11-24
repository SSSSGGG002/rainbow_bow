"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cloud, Mail } from "lucide-react";
import { PostcardView } from "@/components/postcard/postcard-view";
import { generatePostcard } from "@/lib/generation-engine";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [petData, setPetData] = useState<any>(null);
  const [postcard, setPostcard] = useState<any>(null);

  useEffect(() => {
    // Check for existing pet memory
    const saved = localStorage.getItem("pet_memory");
    if (saved) {
      const data = JSON.parse(saved);
      setPetData(data);
      // Generate a postcard
      generatePostcard(data).then(setPostcard);
    }
  }, []);

  if (petData && postcard) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-secondary/5">
        <div className="w-full max-w-md space-y-8 flex flex-col items-center">
          <PostcardView content={postcard} petName={petData.name} />

          <Link href="/mailbox" className="w-full">
            <Button variant="outline" className="w-full h-12">
              <Mail className="w-4 h-4 mr-2" />
              去信箱看看
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-secondary/20 rounded-full">
            <Cloud className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            彩虹桥信箱
          </h1>
          <p className="text-muted-foreground">
            连接彼岸的思念。这里虽然没有牛肉干，但是云朵是甜的。
          </p>
        </div>

        <div className="grid gap-4">
          <Link href="/onboarding" className="w-full">
            <Button className="w-full">
              建立连接 (Onboarding)
            </Button>
          </Link>
          <Link href="/mailbox" className="w-full">
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              查看信箱
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
