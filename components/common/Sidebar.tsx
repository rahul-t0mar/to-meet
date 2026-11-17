"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "cn";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen pt-25 w-fit flex-col justify-between bg-secondary text-foreground max-sm:hidden lg:w-66">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          const isActive =
            link.href === "/"
              ? pathName === "/"
              : pathName === link.href || pathName.startsWith(`${link.href}/`);
          return (
            <Link
              href={link.href}
              key={link.label}
              className={cn(
                "flex mx-4 gap-4 items-center p-4 rounded-lg justify-start",
                { "bg-primary": isActive },
              )}
            >
              <Icon size={20} />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
