import { Hono } from "hono";
import { handle } from "hono/vercel";
import images from "./images";

// We use "nodejs" instead of edge to be able to deploy it everywhere
export const runtime = "nodejs"

const app = new Hono().basePath("/api");

const routes = app
    .route("/images" , images)
    

export const GET = handle(app)
export const POST = handle(app)

export type appType = typeof routes