import { forward } from "@/lib/ledger";

export async function GET() {
  return forward("/ready");
}
