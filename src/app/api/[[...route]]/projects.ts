import { db } from "@/db/drizzle";
import { projectInsertSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/:projectId",
    verifyAuth(),
    zValidator("param", z.object({ projectId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { projectId } = c.req.valid("param");
      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.id, projectId), eq(projects.userId, auth.token.id))
        );

      if (data.length === 0) {
        return c.json({ error: "project does not exist" }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      projectInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { name, json, width, height } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .insert(projects)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (data.length === 0) {
        return c.json({ error: "something went wrong" }, 400);
      }

      return c.json({ data: data[0] });
    }
  );

export default app;
