import { NextRequest, NextResponse } from "next/server";
import { getBugsCollection } from "@/lib/mongodb";
import { BugStatus } from "@/types/bug";

const VALID_STATUSES: BugStatus[] = ["Open", "In Progress", "Resolved"];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = body.status as BugStatus;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be Open, In Progress, or Resolved." },
        { status: 400 }
      );
    }

    const collection = await getBugsCollection();
    const updated = await collection.findOneAndUpdate(
      { id },
      { $set: { status } },
      { returnDocument: "after", projection: { _id: 0 } }
    );

    if (!updated) {
      return NextResponse.json(
        { error: `Bug report #${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ report: updated }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update bug report";
    const statusCode = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
