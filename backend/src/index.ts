import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

// This ensures c.env.hono_todo_app is correctly typed
type Bindings = {
  hono_todo_app: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/users/:id", async (c) => {
  const id = c.req.param("id");
  try {
    let { results } = await c.env.hono_todo_app.prepare("SELECT * FROM todos WHERE id = ?").bind(id).run();
    return c.json(results);
  } catch (e) {
    return c.json({ err: e.message }, 500);
  }
});

// Export our Hono app: Hono automatically exports a
// Workers 'fetch' handler for you
export default app;
