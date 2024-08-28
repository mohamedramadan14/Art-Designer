import { type NextAuthConfig, type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { JWT } from "next-auth/jwt";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = credentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const query = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        const user = query[0];

        if (!user || !user.password) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return null;
        }

        return user;
      },
    }),
    GitHub,
    Google,
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.id) {
        session.user.id = token.id;
      }
      //console.log(session.user.id);
      return session;
    },
  },
} satisfies NextAuthConfig;
