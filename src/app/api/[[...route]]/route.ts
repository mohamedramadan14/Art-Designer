import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from "./projects";
import subscriptions from "./subscriptions";

import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { authConfig } from "@/auth.config";
// We use "nodejs" instead of edge to be able to deploy it everywhere
export const runtime = "nodejs"

const getAuthConfig = (c: Context): AuthConfig => {
    return {
        ...authConfig
    }
}

const app = new Hono().basePath("/api");


app.use("*" , initAuthConfig(getAuthConfig))
const routes = app
    .route("/images" , images)
    .route("/ai" , ai)
    .route("/users" , users)
    .route("/projects" , projects)    
    .route("/subscriptions" , subscriptions)
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)

export type appType = typeof routes