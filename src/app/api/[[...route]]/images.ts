import { unsplash } from "@/lib/unsplash";
import { Hono } from "hono";

export const DEFAULT_IMAGES_COUNT = 50;
export const DEFAULT_COLLECTIONS_IDS = ["317099"];

const app = new Hono().get("/", async (c) => {
  const images = await unsplash.photos.getRandom({
    collectionIds: DEFAULT_COLLECTIONS_IDS,
    count: DEFAULT_IMAGES_COUNT,
  });
  if (images.errors) {
    return c.json({ error: "something went wrong" }, 400);
  }
  let response = images.response;
  if (!Array.isArray(response)) {
    response = [response];
  }
  return c.json({ data: response });
});

export default app;
