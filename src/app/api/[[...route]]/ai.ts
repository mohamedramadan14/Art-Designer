import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { replicate } from "@/lib/replicate";
import { verifyAuth } from "@hono/auth-js";

const app = new Hono()
  .post(
    "/generate",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      })
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");
      const input = {
        prompt: prompt,
        num_outputs: 1,
        output_format: "jpg",
      };

      const output = await replicate.run("black-forest-labs/flux-schnell", {
        input,
      });

      const res = output as Array<string>;

      return c.json({ data: res[0] });
    }
  )

  .post(
    "/rm-bg",
    verifyAuth(),
    zValidator("json", z.object({ image: z.string() })),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image,
      };

      const output: unknown = await replicate.run(
        "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        { input }
      );

      const res = output as string;

      return c.json({ data: res });
    }
  );

export default app;
