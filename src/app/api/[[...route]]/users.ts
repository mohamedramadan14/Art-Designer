import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string().min(2),
      email: z.string().email().min(5),
      password: z.string().min(3),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");
    const existingUsers = await db.select().from(users).where(eq(users.email, email));
    if (existingUsers.length > 0) {
      return c.json({ error: "Email already in use" } , 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await db.insert(users).values({ name, email, password: hashedPassword });
    return c.json({ success: true } , 200);
  }
);

export default app;
