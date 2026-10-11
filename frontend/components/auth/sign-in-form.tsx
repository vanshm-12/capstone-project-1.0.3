"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { RHFFormProvider, RHFTextField } from "@/components/hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signInApi, SignInPayload } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth-context";

export const SignInForm = () => {
  const router = useRouter();
  const { loginUser } = useAuth();

  const methods = useForm<SignInPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: signInApi,
    onSuccess: (data) => {
      loginUser({
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      });
      router.push("/");
    },
  });

  const onSubmit = (data: SignInPayload) => {
    mutate(data);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your Book Worm account</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <RHFTextField
            name="email"
            label="Email Address"
            placeholder="user@example.com"
            type="email"
            required
          />

          <RHFTextField
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            required
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </RHFFormProvider>
      </CardContent>

      <CardFooter className="justify-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="ml-1 text-primary hover:underline">
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
};
