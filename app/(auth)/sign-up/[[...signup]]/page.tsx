import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Suspense fallback={<div>Loading sign up...</div>}>
        <SignUp />
      </Suspense>
    </main>
  );
}
