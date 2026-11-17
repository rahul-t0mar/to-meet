import { Suspense, type ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";

async function ProtectedContent({ children }: { children: ReactNode }) {
  await auth.protect();

  return <main>{children}</main>;
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedContent>{children}</ProtectedContent>
    </Suspense>
  );
}
