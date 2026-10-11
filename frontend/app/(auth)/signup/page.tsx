import { SignUpForm } from "@/components/auth/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center p-6">
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUpPage;
