import type { Express } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { db } from "@db";
import { astrologers, horoscopes, products, bookings, birthCharts, planetaryPositions, consultations, chatMessages, planetaryAlignments, aiPredictions, houses, aspects } from "@db/schema";
import { eq, desc, gte, lte } from "drizzle-orm";
import { generateAstrologicalResponse } from './lib/anthropic';
import {
  calculatePlanetaryPositions,
  calculateHouseCusps,
  calculateAspects,
  interpretChart,
  calculateDashaPeriods,
  identifyYogas,
  generateGeneralReading,
  generateChartImage
} from './lib/astrology';

export function registerRoutes(app: Express): Server {
  // Astrologers
  app.get("/api/astrologers", async (_req, res) => {
    const result = await db.select().from(astrologers);
    res.json(result);
  });

  // Horoscopes
  app.get("/api/horoscope/:sign", async (req, res) => {
    try {
      const sign = req.params.sign.toLowerCase();
      const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
                         'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

      if (!validSigns.includes(sign)) {
        return res.status(400).json({ error: "Invalid zodiac sign" });
      }

      // Get today's horoscope for the sign
      const result = await db.select()
        .from(horoscopes)
        .where(eq(horoscopes.zodiacSign, sign))
        .orderBy(desc(horoscopes.date))
        .limit(1);

      if (!result.length) {
        // If no horoscope exists, create a sample one
        const sampleHoroscope = {
          zodiacSign: sign,
          dailyReading: `Today brings exciting opportunities for ${sign}. Trust your instincts and embrace new challenges.`,
          date: new Date(),
          mood: "Optimistic",
          color: "Purple",
          luckyNumber: Math.floor(Math.random() * 99) + 1
        };

        const inserted = await db.insert(horoscopes)
          .values(sampleHoroscope)
          .returning();

        return res.json(inserted[0]);
      }

      res.json(result[0]);
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      res.status(500).json({ error: "Failed to fetch horoscope" });
    }
  });

  // Products
  app.get("/api/products", async (_req, res) => {
    const result = await db.select().from(products);
    res.json(result);
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    const booking = req.body;
    const result = await db.insert(bookings).values(booking);
    res.json(result);
  });

  // Birth Charts
  app.post("/api/birth-charts", async (req, res) => {
    try {
      const { name, birthDate, birthTime, birthPlace, latitude, longitude } = req.body;

      // Calculate Ayanamsa
      const ayanamsa = "Lahiri"; // You can make this configurable

      // Calculate planetary positions with dignity and aspects
      const positions = await calculatePlanetaryPositions(birthDate, birthTime, latitude, longitude);

      // Calculate house cusps
      const houseCusps = calculateHouseCusps(birthDate, birthTime, latitude, longitude);

      // Calculate aspects between planets
      const aspects = calculateAspects(positions);

      // Generate house interpretations
      const houseInterpretations = interpretChart(positions, houseCusps);

      // Calculate Vimshottari Dasha periods
      const dashaPeriods = calculateDashaPeriods(positions.find(p => p.name === "Moon")!);

      // Identify Yoga formations
      const yogas = identifyYogas(positions, houseCusps);

      // Generate personalized reading
      const generalReading = generateGeneralReading(positions, houseCusps, yogas);

      // Generate chart image (this would be implemented in the astrology lib)
      const chartImage = await generateChartImage(positions, houseCusps);

      // Return comprehensive chart data
      res.json({
        positions: positions.map(pos => ({
          ...pos,
          aspects: aspects.filter(a => a.planet1 === pos.name || a.planet2 === pos.name)
        })),
        houses: houseCusps.map((house, index) => ({
          ...house,
          interpretation: houseInterpretations[index],
          planets: positions.filter(p => p.house === house.house).map(p => p.name)
        })),
        dashas: dashaPeriods,
        yogas,
        generalReading,
        chartImage,
        birthDate,
        birthTime,
        birthPlace,
        latitude,
        longitude,
        ayanamsa
      });

    } catch (error) {
      console.error("Error generating birth chart:", error);
      res.status(500).json({ error: "Failed to generate birth chart" });
    }
  });

  app.get("/api/birth-charts/:id", async (req, res) => {
    try {
      const chart = await db.select()
        .from(birthCharts)
        .where(eq(birthCharts.id, parseInt(req.params.id)))
        .limit(1);

      if (!chart.length) {
        return res.status(404).json({ error: "Birth chart not found" });
      }

      const positions = await db.select()
        .from(planetaryPositions)
        .where(eq(planetaryPositions.birthChartId, chart[0].id));

      res.json({ chart: chart[0], positions });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch birth chart" });
    }
  });

  // Consultations
  app.post("/api/consultations", async (req, res) => {
    try {
      const consultation = await db.insert(consultations).values({
        ...req.body,
        status: "scheduled",
        createdAt: new Date(),
      }).returning();

      res.json(consultation[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create consultation" });
    }
  });

  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const consultation = await db.select()
        .from(consultations)
        .where(eq(consultations.id, parseInt(req.params.id)))
        .limit(1);

      if (!consultation.length) {
        return res.status(404).json({ error: "Consultation not found" });
      }

      const messages = await db.select()
        .from(chatMessages)
        .where(eq(chatMessages.consultationId, consultation[0].id));

      res.json({ consultation: consultation[0], messages });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation" });
    }
  });

  // Chat endpoints
  app.post("/api/chat/send", async (req, res) => {
    try {
      const { message } = req.body;

      // Store user message
      const userMessage = await db.insert(chatMessages).values({
        consultationId: 0, // Default consultation for general chat
        senderId: 0, // Default sender for general chat
        message,
        createdAt: new Date()
      }).returning();

      // Generate response using Anthropic
      const response = await generateAstrologicalResponse(message);

      // Store bot response
      const botMessage = await db.insert(chatMessages).values({
        consultationId: 0, // Default consultation for general chat
        senderId: -1, // Use -1 to indicate bot
        message: response,
        createdAt: new Date()
      }).returning();

      res.json({ message: response });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  app.get("/api/chat/history", async (_req, res) => {
    try {
      const messages = await db.select()
        .from(chatMessages)
        .orderBy(desc(chatMessages.createdAt))
        .limit(50);

      res.json(messages.reverse());
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  // Planetary Alignments
  app.get("/api/planetary-alignments", async (req, res) => {
    try {
      const date = req.query.date ? new Date(req.query.date as string) : new Date();

      // Get alignments for the specified date
      const alignmentResults = await db.select()
        .from(planetaryAlignments)
        .where(
          gte(planetaryAlignments.date, new Date(date.setHours(0,0,0,0)))
        )
        .orderBy(planetaryAlignments.startTime)
        .limit(10);

      // If no alignments exist for the date, create sample predictions
      if (!alignmentResults.length) {
        const sampleAlignments = [
          {
            date: date,
            planets: ["Mars", "Jupiter"],
            alignmentType: "Conjunction",
            degree: 0.5,
            influence: "A powerful time for taking action and expanding horizons. This alignment brings energy and optimism.",
            startTime: new Date(date.setHours(8,0,0,0)),
            peakTime: new Date(date.setHours(12,0,0,0)),
            endTime: new Date(date.setHours(16,0,0,0)),
            significance: 8.5
          },
          {
            date: date,
            planets: ["Venus", "Saturn"],
            alignmentType: "Trine",
            degree: 120,
            influence: "A harmonious period for relationships and long-term commitments. Balance between pleasure and responsibility.",
            startTime: new Date(date.setHours(14,0,0,0)),
            peakTime: new Date(date.setHours(18,0,0,0)),
            endTime: new Date(date.setHours(22,0,0,0)),
            significance: 7.2
          }
        ];

        const inserted = await db.insert(planetaryAlignments)
          .values(sampleAlignments)
          .returning();

        return res.json(inserted);
      }

      res.json(alignmentResults);
    } catch (error) {
      console.error("Error fetching planetary alignments:", error);
      res.status(500).json({ error: "Failed to fetch planetary alignments" });
    }
  });

  // AI Predictions
  app.get("/api/predictions", async (_req, res) => {
    try {
      const predictions = await db.select()
        .from(aiPredictions)
        .orderBy(desc(aiPredictions.createdAt))
        .limit(10);

      res.json(predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      res.status(500).json({ error: "Failed to fetch predictions" });
    }
  });

  app.post("/api/predictions", async (req, res) => {
    try {
      const { predictionType } = req.body;

      // Generate the prediction content using Anthropic
      const prompt = `Generate an astrological prediction for ${predictionType} based on current planetary positions. Include specific insights and guidance.`;
      const content = await generateAstrologicalResponse(prompt);

      // Create the prediction
      const prediction = await db.insert(aiPredictions)
        .values({
          userId: 1, // Default user for now
          predictionType,
          content,
          planetaryContext: {
            alignments: ["Mars-Jupiter conjunction", "Venus-Saturn trine"],
            influences: ["Energy and optimism", "Balance and commitment"]
          },
          accuracy: 0.85,
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 7 days
          createdAt: new Date(),
        })
        .returning();

      res.json(prediction[0]);
    } catch (error) {
      console.error("Error generating prediction:", error);
      res.status(500).json({ error: "Failed to generate prediction" });
    }
  });

  app.post("/api/predictions/:id/feedback", async (req, res) => {
    try {
      const { id } = req.params;
      const { feedback } = req.body;

      const updated = await db.update(aiPredictions)
        .set({ userFeedback: feedback })
        .where(eq(aiPredictions.id, parseInt(id)))
        .returning();

      res.json(updated[0]);
    } catch (error) {
      console.error("Error updating prediction feedback:", error);
      res.status(500).json({ error: "Failed to update prediction feedback" });
    }
  });

  const httpServer = createServer(app);

  // Set up Socket.IO
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Handle WebSocket connections
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join consultation room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", socket.id);
    });

    // Handle chat messages
    socket.on("send-message", async (data) => {
      try {
        const message = await db.insert(chatMessages).values({
          consultationId: data.consultationId,
          senderId: data.senderId,
          message: data.message,
          createdAt: new Date()
        }).returning();

        io.to(data.roomId).emit("receive-message", message[0]);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Handle video signaling
    socket.on("video-signal", (data) => {
      socket.to(data.roomId).emit("video-signal", {
        signal: data.signal,
        from: socket.id
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return httpServer;
}