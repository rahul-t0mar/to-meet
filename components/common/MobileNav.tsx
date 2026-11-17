"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "cn";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Mobile Navbar"
            className="cursor-pointer "
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-secondary pt-5 pl-2"
        >
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Logo"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold">ToMeet</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose>
              <section className="flex h-full flex-col gap-6 pt-16">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;

                  const isActive =
                    link.href === "/"
                      ? pathName === "/"
                      : pathName === link.href ||
                        pathName.startsWith(`${link.href}/`);
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
                      <p className="font-semibold">
                        {link.label}
                      </p>
                    </Link>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
