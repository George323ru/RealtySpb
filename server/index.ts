import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { serverLogger, logStartup, routesLogger } from "./logger";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware для логирования HTTP запросов
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Логируем входящий запрос
  routesLogger.httpRequest(req.method, path, {
    query: req.query,
    body: req.method !== 'GET' ? req.body : undefined,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    
    // Определяем размер ответа
    let responseSize: number | undefined = undefined;
    if (capturedJsonResponse) {
      responseSize = JSON.stringify(capturedJsonResponse).length;
    }

    // Логируем ответ
    routesLogger.httpResponse(req.method, path, res.statusCode, duration, responseSize);
  });

  next();
});

(async () => {
  try {
    serverLogger.processStart('Server initialization');
    
    const server = await registerRoutes(app);
    serverLogger.info('✅ Маршруты зарегистрированы');

    // Обработчик ошибок
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Логируем ошибку
      routesLogger.error(`Ошибка при обработке ${req.method} ${req.path}`, err, {
        statusCode: status,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.status(status).json({ message });
    });

    // Настройка Vite в режиме разработки
    if (app.get("env") === "development") {
      serverLogger.info('🔧 Настройка Vite для разработки');
      await setupVite(app, server);
      serverLogger.info('✅ Vite настроен');
    } else {
      serverLogger.info('📦 Подключение статических файлов');
      serveStatic(app);
      serverLogger.info('✅ Статические файлы подключены');
    }

    // Запуск сервера
    const port = 3000;
    server.listen(port, "localhost", () => {
      logStartup('RealtySpb Server', port, process.env.NODE_ENV);
      serverLogger.processEnd('Server initialization');
    });

  } catch (error) {
    serverLogger.processError('Server initialization', error);
    process.exit(1);
  }
})();
