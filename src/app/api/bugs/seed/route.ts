import { NextResponse } from "next/server";
import { getBugsCollection } from "@/lib/mongodb";
import { INITIAL_SAMPLE_BUGS } from "@/data/sampleBugs";

export async function POST() {
  try {
    const collection = await getBugsCollection();

    await collection.bulkWrite(
      INITIAL_SAMPLE_BUGS.map((bug) => ({
        updateOne: {
          filter: { id: bug.id },
          update: { $set: bug },
          upsert: true,
        },
      }))
    );

    const reports = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to seed bug reports";
    const status = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
