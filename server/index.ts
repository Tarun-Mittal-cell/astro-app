import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Basic CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Request validation middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Validate Content-Type for POST/PUT requests
  if ((req.method === 'POST' || req.method === 'PUT') && !req.is('application/json')) {
    return res.status(415).json({
      status: 'error',
      message: 'Content-Type must be application/json'
    });
  }

  // Validate request body size
  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 10 * 1024 * 1024) { // 10MB limit
    return res.status(413).json({
      status: 'error',
      message: 'Request entity too large'
    });
  }

  next();
});

// Response interceptor to ensure consistent format
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    // Ensure response follows standard format
    if (path.startsWith("/api")) {
      if (!bodyJson.hasOwnProperty('status')) {
        bodyJson = {
          status: res.statusCode >= 400 ? 'error' : 'success',
          data: bodyJson
        };
      }
      
      // Add metadata to all responses
      bodyJson.metadata = {
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        duration: Date.now() - start
      };
    }

    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      if (capturedJsonResponse) {
        const status = capturedJsonResponse.status || 'unknown';
        logLine += ` [${status}]`;
        
        if (res.statusCode >= 400 && capturedJsonResponse.message) {
          logLine += ` :: ${capturedJsonResponse.message}`;
        }
      }

      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  // Global error handlers
  
  // Handle 404 errors
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      status: 'error',
      message: 'Resource not found',
      details: 'The requested endpoint does not exist'
    });
  });

  // Handle validation errors
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        details: err.details || err.message
      });
    }
    next(err);
  });

  // Handle database errors
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err.code && err.code.startsWith('23')) { // PostgreSQL error codes
      return res.status(400).json({
        status: 'error',
        message: 'Database Error',
        details: process.env.NODE_ENV === 'development' ? err.message : 'A database error occurred'
      });
    }
    next(err);
  });

  // Final error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled Error:', err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Don't expose internal error details in production
    const details = process.env.NODE_ENV === 'development' 
      ? {
          stack: err.stack,
          code: err.code,
          name: err.name
        }
      : undefined;

    res.status(status).json({
      status: 'error',
      message,
      details,
      timestamp: new Date().toISOString()
    });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Serve the app on port 3005
  // this serves both the API and the client
  const PORT = 3005;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
