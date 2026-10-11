"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
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
import { signUpApi, SignUpPayload } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth-context";

export const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginUser } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  const methods = useForm<SignUpPayload>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      loginUser({
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      });
      router.push(redirectTo);
      router.refresh();
    },
  });

  const onSubmit = (data: SignUpPayload) => {
    mutate(data);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Join Book Worm to track orders and save your wishlist
        </CardDescription>
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
            name="name"
            label="Full Name"
            placeholder="e.g. Daniel Reed"
            required
          />

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
            minLength={6}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating Account..." : "Sign Up"}
          </Button>
        </RHFFormProvider>
      </CardContent>

      <CardFooter className="justify-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="ml-1 text-primary hover:underline">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};
