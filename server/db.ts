import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.js";
import { dbLogger } from "./logger";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  dbLogger.warn("DATABASE_URL не установлен. Функции базы данных будут отключены.");
} else {
  dbLogger.info("Инициализация подключения к базе данных", {
    url: process.env.DATABASE_URL.replace(/:[^:]+@/, ':***@') // скрываем пароль в логах
  });
}

// Создаем пул подключений с логированием
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  // Добавляем обработчики событий для логирования
  onConnect: () => {
    dbLogger.info('🔌 Новое подключение к базе данных установлено');
  },
  onError: (error: Error) => {
    dbLogger.error('💥 Ошибка подключения к базе данных', error);
  }
});

// Создаем экземпляр drizzle с логированием SQL запросов
export const db = drizzle({ 
  client: pool, 
  schema,
  logger: process.env.LOG_SQL === 'true' ? {
    logQuery: (query: string, params: unknown[]) => {
      dbLogger.debug('Выполнение SQL запроса', {
        query: query.substring(0, 200) + (query.length > 200 ? '...' : ''),
        params: params?.length > 0 ? params : undefined,
        type: 'sql_query'
      });
    }
  } : false
});

// Обработчики событий процесса для корректного закрытия подключений
process.on('beforeExit', async () => {
  dbLogger.info('🔌 Закрытие подключений к базе данных');
  await pool.end();
});

process.on('SIGINT', async () => {
  dbLogger.info('🔌 Принудительное закрытие подключений к базе данных (SIGINT)');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  dbLogger.info('🔌 Принудительное закрытие подключений к базе данных (SIGTERM)');
  await pool.end();
  process.exit(0);
});

// Функция для проверки подключения к базе данных
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    dbLogger.info('🔍 Проверка подключения к базе данных');
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    dbLogger.info('✅ Подключение к базе данных успешно');
    return true;
  } catch (error) {
    dbLogger.error('❌ Не удалось подключиться к базе данных', error as Error);
    return false;
  }
}

// Инициализация проверки подключения при загрузке модуля
if (process.env.DATABASE_URL) {
  checkDatabaseConnection().catch(error => {
    dbLogger.error('Критическая ошибка при инициализации базы данных', error as Error);
  });
}