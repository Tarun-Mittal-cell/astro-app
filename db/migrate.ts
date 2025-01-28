import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Running migrations...");
    
    // Insert sample horoscopes for each zodiac sign
    const zodiacSigns = [
      "aries", "taurus", "gemini", "cancer", "leo", "virgo",
      "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
    ];

    // Check if horoscopes already exist
    const existingHoroscopes = await db.select().from(schema.horoscopes);
    
    if (existingHoroscopes.length === 0) {
      console.log("Inserting sample horoscopes...");
      
      for (const sign of zodiacSigns) {
        await db.insert(schema.horoscopes).values({
          zodiacSign: sign,
          dailyReading: `Today brings exciting opportunities for ${sign}. Trust your instincts and embrace new challenges. The stars align to support your personal growth and development.`,
          date: new Date(),
          mood: "Optimistic",
          color: "Purple",
          luckyNumber: Math.floor(Math.random() * 99) + 1
        });
      }
      
      console.log("Sample horoscopes inserted successfully");
    } else {
      console.log("Horoscopes already exist, skipping sample data insertion");
    }
    
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    // Close the database connection
    try {
      await sql.end();
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }
};

main();