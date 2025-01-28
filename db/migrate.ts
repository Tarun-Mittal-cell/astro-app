import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Running migrations...");
    
    // Insert sample horoscopes for each zodiac sign
    const zodiacSigns = [
      "aries", "taurus", "gemini", "cancer", "leo", "virgo",
      "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
    ];

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
    
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

main();