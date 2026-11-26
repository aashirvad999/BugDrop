import { NextRequest, NextResponse } from "next/server";
import { getBugsCollection } from "@/lib/mongodb";
import { BugReport, Severity } from "@/types/bug";

const VALID_SEVERITIES: Severity[] = ["Low", "Medium", "High"];

export async function GET() {
  try {
    const collection = await getBugsCollection();
    const docs = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ reports: docs }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch bug reports";
    const status = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const severity: Severity = VALID_SEVERITIES.includes(body.severity)
      ? body.severity
      : "Medium";
    const environment =
      typeof body.environment === "string" && body.environment.trim()
        ? body.environment.trim()
        : "Local Client";
    const reporter =
      typeof body.reporter === "string" && body.reporter.trim()
        ? body.reporter.trim()
        : "You";

    if (title.length < 5) {
      return NextResponse.json(
        { error: "Title must be at least 5 characters long." },
        { status: 400 }
      );
    }

    if (description.length < 10) {
      return NextResponse.json(
        { error: "Description must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const newReport: BugReport = {
      id:
        typeof body.id === "string" && body.id.trim()
          ? body.id.trim()
          : `BD-${Math.floor(1043 + Math.random() * 9000)}`,
      title,
      description,
      severity,
      status: "Open",
      createdAt: new Date().toISOString(),
      reporter,
      environment,
    };

    const collection = await getBugsCollection();
    await collection.insertOne({ ...newReport });

    return NextResponse.json({ report: newReport }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create bug report";
    const status = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
