import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Создаем директорию для логов, если она не существует
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Настройка форматирования логов
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Формат для консоли
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let logMessage = `${timestamp} [${level}]: ${message}`;
    
    // Добавляем метаданные, если они есть
    if (Object.keys(meta).length > 0) {
      logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    // Добавляем stack trace для ошибок
    if (stack) {
      logMessage += `\n${stack}`;
    }
    
    return logMessage;
  })
);

// Создаем основной логгер
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
  format: logFormat,
  transports: [
    // Основной файл логов
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      level: 'info',
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      tailable: true
    }),
    
    // Файл только для ошибок
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      tailable: true
    }),
    
    // Консоль
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    })
  ],
  
  // Обработка исключений
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log')
    })
  ],
  
  // Обработка отклоненных промисов
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log')
    })
  ]
});

// Класс для типизированного логирования
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(message: string, meta?: Record<string, any>): [string, Record<string, any>] {
    const formattedMessage = `[${this.context}] ${message}`;
    const logMeta = { context: this.context, ...meta };
    return [formattedMessage, logMeta];
  }

  debug(message: string, meta?: Record<string, any>): void {
    const [formattedMessage, logMeta] = this.formatMessage(message, meta);
    logger.debug(formattedMessage, logMeta);
  }

  info(message: string, meta?: Record<string, any>): void {
    const [formattedMessage, logMeta] = this.formatMessage(message, meta);
    logger.info(formattedMessage, logMeta);
  }

  warn(message: string, meta?: Record<string, any>): void {
    const [formattedMessage, logMeta] = this.formatMessage(message, meta);
    logger.warn(formattedMessage, logMeta);
  }

  error(message: string, error?: Error | any, meta?: Record<string, any>): void {
    const [formattedMessage, logMeta] = this.formatMessage(message, meta);
    
    if (error) {
      if (error instanceof Error) {
        logger.error(formattedMessage, { 
          ...logMeta, 
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack
          }
        });
      } else {
        logger.error(formattedMessage, { 
          ...logMeta, 
          error: String(error)
        });
      }
    } else {
      logger.error(formattedMessage, logMeta);
    }
  }

  // Специальные методы для логирования процессов
  processStart(processName: string, params?: Record<string, any>): void {
    this.info(`🚀 Процесс запущен: ${processName}`, { 
      process: processName, 
      params,
      action: 'start'
    });
  }

  processEnd(processName: string, duration?: number, result?: any): void {
    const meta: Record<string, any> = { 
      process: processName, 
      action: 'end'
    };
    
    if (duration !== undefined) {
      meta.duration = `${duration}ms`;
    }
    
    if (result !== undefined) {
      meta.result = result;
    }
    
    this.info(`✅ Процесс завершен: ${processName}`, meta);
  }

  processError(processName: string, error: Error | any, params?: Record<string, any>): void {
    this.error(`❌ Ошибка в процессе: ${processName}`, error, { 
      process: processName, 
      params,
      action: 'error'
    });
  }

  // Логирование HTTP запросов
  httpRequest(method: string, path: string, params?: Record<string, any>): void {
    this.info(`🌐 HTTP ${method} ${path}`, { 
      method, 
      path, 
      params,
      type: 'http_request'
    });
  }

  httpResponse(method: string, path: string, statusCode: number, duration: number, responseSize?: number): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    const emoji = statusCode >= 400 ? '⚠️' : '✅';
    
    logger[level](`${emoji} HTTP ${method} ${path} ${statusCode} ${duration}ms`, {
      context: this.context,
      method,
      path,
      statusCode,
      duration: `${duration}ms`,
      responseSize,
      type: 'http_response'
    });
  }

  // Логирование работы с базой данных
  dbQuery(query: string, params?: any[], duration?: number): void {
    const meta: Record<string, any> = { 
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      type: 'db_query'
    };
    
    if (params && params.length > 0) {
      meta.params = params;
    }
    
    if (duration !== undefined) {
      meta.duration = `${duration}ms`;
    }
    
    this.debug(`🗄️ Database query executed`, meta);
  }

  dbError(query: string, error: Error, params?: any[]): void {
    this.error(`🗄️ Database query failed`, error, { 
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      params,
      type: 'db_error'
    });
  }
}

// Создаем экземпляры логгеров для разных модулей
export const appLogger = new Logger('APP');
export const serverLogger = new Logger('SERVER');
export const routesLogger = new Logger('ROUTES');
export const storageLogger = new Logger('STORAGE');
export const dbLogger = new Logger('DATABASE');

// Экспортируем основной winston логгер для специальных случаев
export { logger as winston };

// Функция для создания логгера с пользовательским контекстом
export function createLogger(context: string): Logger {
  return new Logger(context);
}

// Утилитарные функции
export function logStartup(serviceName: string, port?: number, environment?: string): void {
  appLogger.info(`🎯 ${serviceName} запускается`, {
    service: serviceName,
    port,
    environment: environment || process.env.NODE_ENV,
    node_version: process.version,
    platform: process.platform,
    action: 'startup'
  });
}

export function logShutdown(serviceName: string, reason?: string): void {
  appLogger.info(`🛑 ${serviceName} завершает работу`, {
    service: serviceName,
    reason,
    action: 'shutdown'
  });
}

// Обработчики для глобальных событий
process.on('uncaughtException', (error) => {
  appLogger.error('💥 Необработанное исключение', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  appLogger.error('💥 Необработанное отклонение промиса', reason as Error, { promise });
});

// Graceful shutdown
process.on('SIGINT', () => {
  logShutdown('RealtySpb Server', 'SIGINT received');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logShutdown('RealtySpb Server', 'SIGTERM received');
  process.exit(0);
}); 