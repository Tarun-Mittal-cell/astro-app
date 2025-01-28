import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Create a connection pool
const sql = neon(process.env.DATABASE_URL);

// Create the database instance with schema
export const db = drizzle(sql, { schema });

// Export the sql client for direct queries if needed
export const sqlClient = sql;
