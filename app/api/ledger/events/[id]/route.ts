import { forward, json, limited, UUID } from "@/lib/ledger";

export async function GET(req: Request, ctx: RouteContext<"/api/ledger/events/[id]">) {
  const { id } = await ctx.params;
  if (!UUID.test(id)) return json({ error: { code: "NOT_FOUND", message: "Unknown event." } }, 404);
  if (limited(req, 240)) return json({ error: { code: "SLOW_DOWN", message: "Too many requests." } }, 429);
  return forward(`/v1/events/${id}`);
}
