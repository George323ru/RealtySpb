import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { createLogger as createAppLogger } from "./logger";

const viteLogger = createLogger();
const appLogger = createAppLogger('VITE');

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  appLogger.processStart('Vite setup', { mode: 'development' });
  
  try {
    const serverOptions = {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true as const,
    };

    const vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          appLogger.error('Vite error', new Error(msg), options);
          viteLogger.error(msg, options);
          process.exit(1);
        },
        warn: (msg, options) => {
          appLogger.warn('Vite warning', { message: msg, options });
          viteLogger.warn(msg, options);
        },
        info: (msg, options) => {
          appLogger.debug('Vite info', { message: msg, options });
          viteLogger.info(msg, options);
        }
      },
      server: serverOptions,
      appType: "custom",
    });

    app.use(vite.middlewares);
    appLogger.info('Vite middlewares подключены');

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      const startTime = Date.now();

      try {
        const clientTemplate = path.resolve(
          import.meta.dirname,
          "..",
          "client",
          "index.html",
        );

        // always reload the index.html file from disk incase it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        
        const duration = Date.now() - startTime;
        appLogger.debug('HTML преобразован', { 
          url, 
          duration: `${duration}ms`,
          templateLength: template.length,
          pageLength: page.length 
        });
        
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        const duration = Date.now() - startTime;
        appLogger.error('Ошибка при преобразовании HTML', e as Error, { 
          url, 
          duration: `${duration}ms` 
        });
        
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    appLogger.processEnd('Vite setup');
  } catch (error) {
    appLogger.processError('Vite setup', error);
    throw error;
  }
}

export function serveStatic(app: Express) {
  appLogger.processStart('Static files setup', { mode: 'production' });
  
  try {
    const distPath = path.resolve(import.meta.dirname, "public");

    if (!fs.existsSync(distPath)) {
      const error = new Error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
      appLogger.processError('Static files setup', error, { distPath });
      throw error;
    }

    appLogger.info('Настройка статических файлов', { distPath });
    app.use(express.static(distPath));

    // fall through to index.html if the file doesn't exist
    app.use("*", (req, res) => {
      const indexPath = path.resolve(distPath, "index.html");
      appLogger.debug('Отправка index.html', { 
        path: req.path, 
        indexPath 
      });
      res.sendFile(indexPath);
    });

    appLogger.processEnd('Static files setup');
  } catch (error) {
    appLogger.processError('Static files setup', error);
    throw error;
  }
}
