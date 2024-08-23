"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export const RegisterCard = () => {
  const onProviderRegister = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Start your journey</CardTitle>
        <CardDescription>
          Create an account with your email, Google or GitHub.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="gap-y-4 flex flex-col">
          <Button
            onClick={() => onProviderRegister("github")}
            size="lg"
            className="w-full flex items-center gap-2 bg-orange-400 hover:bg-orange-500"
          >
            <FaGithub className="size-6" />
            Continue with GitHub
          </Button>
          <Button
            onClick={() => onProviderRegister("google")}
            size="lg"
            className="w-full flex items-center gap-2 bg-orange-400 hover:bg-orange-500"
          >
            <FcGoogle className="size-6" />
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-orange-700 hover:underline hover:text-orange-600">
              Login
            </span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
