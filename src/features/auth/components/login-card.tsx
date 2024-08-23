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
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
export const LoginCard = () => {
  const onProviderSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Continue your journey</CardTitle>
        <CardDescription>
          Login with your email, or use Google or GitHub.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="gap-y-4 flex flex-col">
          <Button
            onClick={() => onProviderSignIn("github")}
            size="lg"
            className="w-full flex items-center gap-2 bg-orange-400 hover:bg-orange-500"
          >
            <FaGithub className="size-6" />
            Continue with GitHub
          </Button>
          <Button
            onClick={() => onProviderSignIn("google")}
            size="lg"
            className="w-full flex items-center gap-2 bg-orange-400 hover:bg-orange-500"
          >
            <FcGoogle className="size-6" />
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            <span className="text-orange-700 hover:underline hover:text-orange-600">
              Register
            </span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
