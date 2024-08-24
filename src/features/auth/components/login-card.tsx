"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TriangleAlert } from "lucide-react";
export const LoginCard = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { email, password, callbackUrl: "/" });
  };

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
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-6" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialLogin} className="space-y-2.5">
          <Input
            className="focus-visible:ring-orange-500 focus-visible:ring-offset-0"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            className="focus-visible:ring-orange-500 focus-visible:ring-offset-0"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500"
            size="lg"
          >
            Continue
          </Button>
        </form>
        <Separator />
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
