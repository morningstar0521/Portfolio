import { forward, json, limited, VISITOR } from "@/lib/ledger";

export async function GET(req: Request, ctx: RouteContext<"/api/ledger/wallets/[id]">) {
  const { id } = await ctx.params;
  if (!VISITOR.test(id)) return json({ error: { code: "NOT_FOUND", message: "Unknown wallet." } }, 404);
  if (limited(req, 120)) return json({ error: { code: "SLOW_DOWN", message: "Too many requests." } }, 429);
  return forward(`/v1/wallets/${id}?verify=true`);
}
