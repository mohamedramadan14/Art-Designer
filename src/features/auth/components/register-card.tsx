"use client";

import { ImSpinner10 } from "react-icons/im";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useRegister } from "@/features/auth/hooks/use-register";
import { TriangleAlert } from "lucide-react";

export const RegisterCard = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const mutation = useRegister();
  const onCredentialRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", { email, password, callbackUrl: "/" });
        },
      }
    );
  };
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
      {!!mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-6" />
          <p>Something went wrong</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialRegister} className="space-y-2.5">
          <Input
            disabled={mutation.isPending}
            className="focus-visible:ring-orange-500 focus-visible:ring-offset-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            type="text"
            required
            minLength={2}
          />
          <Input
            disabled={mutation.isPending}
            className="focus-visible:ring-orange-500 focus-visible:ring-offset-0"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            minLength={5}
          />
          <Input
            disabled={mutation.isPending}
            className="focus-visible:ring-orange-500 focus-visible:ring-offset-0"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={3}
          />
          <Button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500"
            size="lg"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ImSpinner10 className=" size-4 animate-spin" />
            ) : (
              "Unleash Creativity"
            )}
          </Button>
        </form>
        <Separator />
        <div className="gap-y-4 flex flex-col">
          <Button
            disabled={mutation.isPending}
            onClick={() => onProviderRegister("github")}
            size="lg"
            className="w-full flex items-center gap-2 bg-orange-400 hover:bg-orange-500"
          >
            <FaGithub className="size-6" />
            Continue with GitHub
          </Button>
          <Button
            disabled={mutation.isPending}
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
