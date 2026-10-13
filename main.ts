import { serveFile } from "jsr:@std/http/file-server";

const port = Number(Deno.env.get("PORT") ?? "8000");
const host = "0.0.0.0";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = `.${pathname}`;

  try {
    return await serveFile(req, filePath);
  } catch {
    return await serveFile(req, "./index.html");
  }
};

console.log(`Server running at http://${host}:${port}`);
Deno.serve({ port, hostname: host }, handler);
