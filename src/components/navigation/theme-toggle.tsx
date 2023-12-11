"use client";

import { MoonIcon, SunIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <IconButton aria-label="theme-toggle" variant="ghost">
        <UpdateIcon className="animate-spin" />
      </IconButton>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton aria-label="theme-toggle" variant="ghost">
          <SunIcon className={cn(resolvedTheme === "dark" && "hidden")} />
          <MoonIcon className={cn(resolvedTheme === "light" && "hidden")} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setTheme("light")}>
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("system")}>
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
