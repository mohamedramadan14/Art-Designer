import { Hono } from "hono";

const app = new Hono()
    .get("/", (c) => {
    return c.json({
        message: "Hello, USER GET",
    });
})
.get("/:name" , (c) =>{
    const name = c.req.param("name");
    return c.json({
        message: `Hello, ${name}`
    })
})

export default app