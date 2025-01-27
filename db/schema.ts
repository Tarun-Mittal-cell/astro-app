import { pgTable, text, serial, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const astrologers = pgTable("astrologers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  experience: integer("experience").notNull(),
  rating: decimal("rating").notNull(),
  reviews: integer("reviews").notNull(),
  languages: text("languages").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull()
});

export const horoscopes = pgTable("horoscopes", {
  id: serial("id").primaryKey(),
  zodiacSign: text("zodiac_sign").notNull(),
  dailyReading: text("daily_reading").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  mood: text("mood").default('Positive').notNull(),
  color: text("color").default('Purple').notNull(),
  luckyNumber: integer("lucky_number").default(7).notNull()
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  rating: decimal("rating").notNull().default('4.5'),
  reviews: integer("reviews").notNull().default(0)
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  astrologerId: integer("astrologer_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  bookingDate: timestamp("booking_date").notNull(),
  status: text("status").notNull()
});

export const birthCharts = pgTable("birth_charts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthDate: timestamp("birth_date").notNull(),
  birthTime: text("birth_time").notNull(),
  birthPlace: text("birth_place").notNull(),
  latitude: decimal("latitude").notNull(),
  longitude: decimal("longitude").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const planetaryPositions = pgTable("planetary_positions", {
  id: serial("id").primaryKey(),
  birthChartId: integer("birth_chart_id").notNull(),
  planet: text("planet").notNull(),
  zodiacSign: text("zodiac_sign").notNull(),
  degree: decimal("degree").notNull(),
  house: integer("house").notNull(),
  retrograde: boolean("retrograde").notNull(),
  dignity: text("dignity").notNull(),
  longitude: decimal("longitude").notNull(),
  celestialLatitude: decimal("celestial_latitude").notNull(),
  speed: decimal("speed").notNull()
});

export const houses = pgTable("houses", {
  id: serial("id").primaryKey(),
  birthChartId: integer("birth_chart_id").notNull(),
  houseNumber: integer("house_number").notNull(),
  zodiacSign: text("zodiac_sign").notNull(),
  degree: decimal("degree").notNull(),
  longitude: decimal("longitude").notNull()
});

export const aspects = pgTable("aspects", {
  id: serial("id").primaryKey(),
  birthChartId: integer("birth_chart_id").notNull(),
  planet1: text("planet1").notNull(),
  planet2: text("planet2").notNull(),
  aspectType: text("aspect_type").notNull(),
  orb: decimal("orb").notNull(),
  nature: text("nature").notNull()
});

export const planetaryAlignments = pgTable("planetary_alignments", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  planets: text("planets").array().notNull(),
  alignmentType: text("alignment_type").notNull(),
  degree: decimal("degree").notNull(),
  influence: text("influence").notNull(),
  startTime: timestamp("start_time").notNull(),
  peakTime: timestamp("peak_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  significance: decimal("significance").notNull(),
  aspectType: text("aspect_type").default('conjunction').notNull(),
  energyQuality: text("energy_quality").default('neutral').notNull(),
  lifeSpheres: text("life_spheres").array().default(['general']).notNull(),
  suggestedActions: jsonb("suggested_actions").default({ actions: [] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  astrologerId: integer("astrologer_id").notNull(),
  userId: integer("user_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status").notNull(),
  consultationType: text("consultation_type").notNull(),
  roomId: text("room_id").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  consultationId: integer("consultation_id").notNull(),
  senderId: integer("sender_id").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const aiPredictions = pgTable("ai_predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  predictionType: text("prediction_type").notNull(), 
  content: text("content").notNull(),
  planetaryContext: jsonb("planetary_context").notNull(), 
  accuracy: decimal("accuracy").default('0.0'),
  userFeedback: integer("user_feedback"), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  validUntil: timestamp("valid_until").notNull()
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  notificationPreferences: jsonb("notification_preferences").notNull(),
  focusAreas: text("focus_areas").array().notNull(), 
  preferredReadingStyle: text("preferred_reading_style").notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const compatibilityScores = pgTable("compatibility_scores", {
  id: serial("id").primaryKey(),
  person1ChartId: integer("person1_chart_id").notNull(),
  person2ChartId: integer("person2_chart_id").notNull(),
  overallScore: decimal("overall_score").notNull(),
  aspectScores: jsonb("aspect_scores").notNull(), 
  relationshipType: text("relationship_type").notNull(), 
  synastryDetails: jsonb("synastry_details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export type Astrologer = typeof astrologers.$inferSelect;
export type NewAstrologer = typeof astrologers.$inferInsert;
export type Horoscope = typeof horoscopes.$inferSelect;
export type NewHoroscope = typeof horoscopes.$inferInsert;
export type Product = typeof products.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type BirthChart = typeof birthCharts.$inferSelect;
export type PlanetaryPosition = typeof planetaryPositions.$inferSelect;
export type Consultation = typeof consultations.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type PlanetaryAlignment = typeof planetaryAlignments.$inferSelect;
export type NewPlanetaryAlignment = typeof planetaryAlignments.$inferInsert;
export type AIPrediction = typeof aiPredictions.$inferSelect;
export type NewAIPrediction = typeof aiPredictions.$inferInsert;
export type UserPreference = typeof userPreferences.$inferSelect;
export type NewUserPreference = typeof userPreferences.$inferInsert;
export type CompatibilityScore = typeof compatibilityScores.$inferSelect;
export type NewCompatibilityScore = typeof compatibilityScores.$inferInsert;
export type House = typeof houses.$inferSelect;
export type NewHouse = typeof houses.$inferInsert;
export type Aspect = typeof aspects.$inferSelect;
export type NewAspect = typeof aspects.$inferInsert;

export const insertAstrologerSchema = createInsertSchema(astrologers);
export const selectAstrologerSchema = createSelectSchema(astrologers);
export const insertHoroscopeSchema = createInsertSchema(horoscopes);
export const selectHoroscopeSchema = createSelectSchema(horoscopes);
export const insertProductSchema = createInsertSchema(products);
export const insertBookingSchema = createInsertSchema(bookings);
export const insertBirthChartSchema = createInsertSchema(birthCharts);
export const insertPlanetaryPositionSchema = createInsertSchema(planetaryPositions);
export const insertConsultationSchema = createInsertSchema(consultations);
export const insertChatMessageSchema = createInsertSchema(chatMessages);
export const insertPlanetaryAlignmentSchema = createInsertSchema(planetaryAlignments);
export const selectPlanetaryAlignmentSchema = createSelectSchema(planetaryAlignments);
export const insertAIPredictionSchema = createInsertSchema(aiPredictions);
export const selectAIPredictionSchema = createSelectSchema(aiPredictions);
export const insertUserPreferenceSchema = createInsertSchema(userPreferences);
export const selectUserPreferenceSchema = createSelectSchema(userPreferences);
export const insertCompatibilityScoreSchema = createInsertSchema(compatibilityScores);
export const selectCompatibilityScoreSchema = createSelectSchema(compatibilityScores);
export const insertHouseSchema = createInsertSchema(houses);
export const selectHouseSchema = createSelectSchema(houses);
export const insertAspectSchema = createInsertSchema(aspects);
export const selectAspectSchema = createSelectSchema(aspects);