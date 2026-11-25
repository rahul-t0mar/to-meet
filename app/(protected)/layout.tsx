import { Suspense, type ReactNode } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import StreamClientProvider from "@/providers/StreamClientProvider";

async function ProtectedContent({ children }: { children: ReactNode }) {
  const { userId } = await auth.protect();
  const clerkUser = await currentUser();

  const user = {
    id: userId,
    name:
      clerkUser?.fullName ||
      clerkUser?.username ||
      clerkUser?.primaryEmailAddress?.emailAddress ||
      userId,
    image: clerkUser?.imageUrl,
  };

  return (
    <main>
      <StreamClientProvider user={user}>{children}</StreamClientProvider>
    </main>
  );
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedContent>{children}</ProtectedContent>
    </Suspense>
  );
}
