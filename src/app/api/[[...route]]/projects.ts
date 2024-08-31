import { db } from "@/db/drizzle";
import { projectInsertSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, asc, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page, limit } = c.req.valid("query");

      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(asc(projects.isPro) , desc(projects.updatedAt));

      return c.json({ data, nextPage: data.length >= limit ? page + 1 : null });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "project does not exist" }, 404);
      }
      return c.json({ data: { id } });
    }
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));
      if (data.length === 0) {
        return c.json({ error: "project does not exist" }, 404);
      }

      const project = data[0];

      const duplicatedProject = await db
        .insert(projects)
        .values({
          name: project.name + " (copy)",
          json: project.json,
          userId: auth.token.id,
          height: project.height,
          width: project.width,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (duplicatedProject.length === 0) {
        return c.json({ error: "failed to duplicate project" }, 400);
      }
      return c.json({ data: duplicatedProject[0] });
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page, limit } = c.req.valid("query");
      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({ data, nextPage: data.length >= limit ? page + 1 : null });
    }
  )
  .patch(
    "/:projectId",
    verifyAuth(),
    zValidator("param", z.object({ projectId: z.string() })),
    zValidator(
      "json",
      projectInsertSchema
        .partial()
        .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { projectId } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const updatedProject = await db
        .update(projects)
        .set({ ...values, updatedAt: new Date() })
        .where(
          and(eq(projects.id, projectId), eq(projects.userId, auth.token.id))
        )
        .returning();

      if (updatedProject.length === 0) {
        return c.json({ error: "project does not exist or unauthorized" }, 400);
      }

      return c.json({ data: updatedProject[0] });
    }
  )
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
