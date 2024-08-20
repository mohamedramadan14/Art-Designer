import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";

// We use "nodejs" instead of edge to be able to deploy it everywhere
export const runtime = "nodejs"

const app = new Hono().basePath("/api");

const routes = app
    .route("/users" , user)
    .get("/test" , (c) =>{
    return c.json({
        message: "Hello, My Dear"
    })
})

export const GET = handle(app)

export type appType = typeof routes