import { Hono } from "hono";
import { handle } from "hono/vercel";
import images from "./images";
import ai from "./ai";
import users from "./users";

// We use "nodejs" instead of edge to be able to deploy it everywhere
export const runtime = "nodejs"

const app = new Hono().basePath("/api");

const routes = app
    .route("/images" , images)
    .route("/ai" , ai)
    .route("/users" , users)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)

export type appType = typeof routes