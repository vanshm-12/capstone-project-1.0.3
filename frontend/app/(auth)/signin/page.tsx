import { SignInForm } from "@/components/auth/sign-in-form";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center p-6">
        <SignInForm />
      </main>
    </div>
  );
};

export default SignInPage;
