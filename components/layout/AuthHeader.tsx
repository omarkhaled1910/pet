import React from "react";
import { cn } from "@/lib/utils"; // part of shadcn utils
import { ModeToggle } from "@/components/ui/mode-toggle"; // optional for theme switching

const AuthHeader = () => {
  return (
    <header
      className={cn(
        "w-full px-4 py-3 border-b",
        "bg-white text-black dark:bg-zinc-900 dark:text-white"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pet Store</h1>
        <ModeToggle />
      </div>
    </header>
  );
};

export default AuthHeader;
