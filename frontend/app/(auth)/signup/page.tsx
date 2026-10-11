import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center p-6">
        <Suspense fallback={<Loading />}>
          <SignUpForm />
        </Suspense>
      </main>
    </div>
  );
};

export default SignUpPage;
