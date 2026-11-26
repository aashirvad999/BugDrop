import { attachDatabasePool } from "@vercel/functions";
import { Collection, Db, MongoClient, MongoClientOptions } from "mongodb";
import { BugReport } from "@/types/bug";

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 60_000,
  serverSelectionTimeoutMS: 5_000,
};

declare global {
  var __bugdropMongoClient: MongoClient | undefined;
  var __bugdropMongoClientPromise: Promise<MongoClient> | undefined;
}

function createClient(): MongoClient {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add MONGODB_URI to .env.local."
    );
  }

  const client = new MongoClient(uri, options);
  attachDatabasePool(client);
  return client;
}

/**
 * Returns a singleton MongoClient connected to MongoDB and attached to
 * Vercel's database pool lifecycle so connections do not leak in serverless functions.
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (globalThis.__bugdropMongoClientPromise) {
    return globalThis.__bugdropMongoClientPromise;
  }

  const client = globalThis.__bugdropMongoClient ?? createClient();
  globalThis.__bugdropMongoClient = client;

  const clientPromise = client.connect().catch((error) => {
    globalThis.__bugdropMongoClientPromise = undefined;
    globalThis.__bugdropMongoClient = undefined;
    throw error;
  });

  globalThis.__bugdropMongoClientPromise = clientPromise;
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || "bugdrop";
  return client.db(dbName);
}

export async function getBugsCollection(): Promise<Collection<BugReport>> {
  const db = await getDatabase();
  return db.collection<BugReport>("bugs");
}
