import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

// This ensures c.env.hono_todo_app is correctly typed
type Bindings = {
  hono_todo_app: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Accessing D1 is via the c.env.YOUR_BINDING property
// app.get("/", (c) => {
//   return c.json({ message: "API is running!" });
// });

app.get("/", (c) => {
  return c.text("Hello from Hono!");
});

app.get("/api/todos", async (c) => {
  try {
    const db = c.env.hono_todo_app;
    const results = await db.prepare("SELECT * FROM Todos").all();
    return c.json({ todos: results.results });
  } catch (error) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

app.post("/api/posts", async (c) => {
  try {
    const db = c.env.hono_todo_app;
    const results = await db.prepare("INSERT INTO Todos (title,completed) VALUES (?,?) RETURNING *").bind("test", false).run();

    return c.json({ postId: results.meta.last_row_id, todo: results.results });
  } catch (error) {
    return c.json({ error: "Failed to create post" }, 500);
  }
});

app.delete("/api/delete", async (c) => {
  try {
    const db = c.env.hono_todo_app;
    const { id } = await c.req.json();
    console.log("Deleting todo with id:", id);
    const results = await db.prepare("DELETE FROM Todos WHERE id = ? RETURNING *").bind("27").run();

    return c.json({ deletedId: id, todo: results.results });
  } catch (error) {
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});

// Export our Hono app: Hono automatically exports a
// Workers 'fetch' handler for you
export default app;
