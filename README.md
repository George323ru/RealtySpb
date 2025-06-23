# RealtySpb - Платформа риэлторских услуг в Санкт-Петербурге

Современная веб-платформа для риэлторских услуг в Санкт-Петербурге, предоставляющая комплексные решения по покупке, продаже и аренде недвижимости, а также дополнительные услуги по ремонту, дизайну и строительству.

## 🏠 Описание проекта

**RealtySpb** — это полнофункциональная платформа для работы с недвижимостью, разработанная с использованием современного стека технологий. Проект реализует полный цикл риэлторских услуг от поиска объектов до сопровождения сделок, включая дополнительные сервисы.

## 🏗 Архитектура проекта

Проект использует **монолитную архитектуру** с единой кодовой базой, объединяющей frontend и backend компоненты:

### Структура файлов
```
RealtySpb/
├── client/                 # Frontend приложение (React + Vite)
├── server/                 # Backend API (Express + Node.js)
├── shared/                 # Общие типы и схемы данных
├── packages/shared/        # Переиспользуемые компоненты
└── package.json           # Единый файл зависимостей
```

### Особенности архитектуры
- **Unified Build**: Один `package.json` для всего проекта
- **Shared Types**: Общие TypeScript типы между frontend и backend
- **Universal Deployment**: Готов к деплою на любую платформу
- **Cross-platform**: Поддержка macOS, Linux, Windows

### Основные направления деятельности:
- **Жилая недвижимость**: квартиры, дома, новостройки, вторичный рынок
- **Коммерческая недвижимость**: офисы, торговые помещения, склады, производственные объекты
- **Земельные участки**: подбор и оформление земли под застройку
- **Дополнительные услуги**: ремонт, дизайн, строительство, юридическое сопровождение

## 🚀 Основные функции и процессы

### 1. Система поиска и фильтрации недвижимости
**Расположение**: `client/src/components/search-form.tsx`, `client/src/pages/buy.tsx`

Реализованы продвинутые фильтры для поиска:
- Тип недвижимости (квартира, дом, коммерческая, земля)
- Районы Санкт-Петербурга (18 районов)
- Ценовые диапазоны
- Количество комнат
- Этажность
- Тип здания (новостройка/вторичка)

```typescript
interface PropertySearchFilters {
  propertyType?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  buildingType?: string;
  rooms?: number;
}
```

### 2. Система управления объектами недвижимости
**Расположение**: `shared/schema.ts`, `server/storage.ts`

Полноценная CRUD система для управления объектами:
- **Объекты недвижимости** (`properties`): квартиры, дома, коммерческие объекты
- **Новостройки** (`newBuildings`): жилые комплексы от застройщиков
- **Галереи изображений**: множественные фото для каждого объекта
- **Характеристики**: площадь, этаж, особенности объекта

### 3. Калькулятор ипотеки
**Расположение**: `client/src/components/MortgageCalculator.tsx`

Интерактивный калькулятор с функциями:
- Расчет ежемесячного платежа
- Определение переплаты по кредиту
- Настройка процентной ставки (3-25%)
- Выбор срока кредитования (5-30 лет)
- Расчет первоначального взноса

```typescript
// Основные параметры калькулятора
const [price, setPrice] = useState(defaultPrice);
const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
const [term, setTerm] = useState(20); // лет
const [rate, setRate] = useState(12); // процентная ставка
```

### 4. Система лидогенерации
**Расположение**: `shared/schema.ts` (таблица `leads`), `server/routes.ts`

Комплексная система для обработки заявок:
- Многоканальные формы обратной связи
- Классификация лидов по типам услуг
- Система статусов: `new`, `contacted`, `in_progress`, `closed`
- Трекинг источников трафика

### 5. Сервисная экосистема
**Расположение**: `client/src/pages/services/`

Реализованы отдельные лендинги для 13 видов услуг:
- **Предпродажная подготовка**: анализ и подготовка объекта к продаже
- **Дизайн-проект**: полный дизайн интерьера с 3D визуализацией
- **Ремонт под ключ**: комплексные ремонтные работы
- **Строительство**: возведение частных домов и коттеджей
- **Проектирование**: архитектурное и конструктивное проектирование
- **Инженерные системы**: монтаж и проектирование коммуникаций

### 6. Система отзывов и блог
**Расположение**: `client/src/pages/reviews.tsx`, `client/src/pages/blog.tsx`

- Модерируемые отзывы клиентов
- Система рейтингов (1-5 звезд)
- SEO-оптимизированный блог с категориями
- Система тегов для статей

### 7. Команда и экспертиза
**Расположение**: `client/src/pages/team.tsx`, `shared/schema.ts` (таблица `teamMembers`)

- Профили специалистов с фото и контактами
- Указание специализации и опыта работы
- Прямые контакты (телефон, Telegram, WhatsApp)

## 🛠 Технологический стек

### Frontend
- **React 18** с TypeScript
- **Wouter** для маршрутизации
- **TanStack Query** для управления состоянием сервера
- **Tailwind CSS** для стилизации
- **Radix UI** компоненты
- **Framer Motion** для анимаций
- **Recharts** для визуализации данных

### Backend
- **Node.js** с Express
- **TypeScript** для типизации
- **Drizzle ORM** для работы с базой данных
- **PostgreSQL** как основная БД
- **Zod** для валидации данных
- **Winston** для системы логирования

### Инструменты разработки
- **Vite** для frontend сборки
- **ESBuild** для backend production сборки
- **TSX** для dev-режима с hot reload
- **Drizzle Kit** для миграций БД
- **PostCSS** и **Autoprefixer**

### DevOps и деплой
- **Универсальная совместимость**: Render, Vercel, Railway, DigitalOcean
- **Environment Variables**: Поддержка `.env` файлов
- **Production Ready**: Оптимизированная сборка для продакшена
- **Cross-platform**: Нативная поддержка macOS, Linux, Windows

## 📦 Установка и запуск

### Предварительные требования
- Node.js версии 18 или выше (протестировано на v22.16.0)
- PostgreSQL база данных (рекомендуется v14+)
- npm или yarn
- **macOS**: Homebrew (для установки зависимостей)
- **Linux**: apt/yum/dnf (в зависимости от дистрибутива)
- **Windows**: WSL2 + Ubuntu (рекомендуется)

### Пошаговая установка

1. **Клонирование репозитория**
```bash
git clone <repository-url>
cd RealtySpb
```

2. **Установка зависимостей**
```bash
npm install
```

3. **Настройка переменных окружения**
Создайте файл `.env` в корне проекта:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/realtyspb
NODE_ENV=development
LOG_LEVEL=debug
LOG_SQL=true
```

4. **Настройка базы данных**
```bash
# Применение миграций
npm run db:push
```

5. **Запуск в режиме разработки**
```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

> **Примечание для macOS**: Если при запуске возникает ошибка `ENOTSUP`, убедитесь, что используете актуальную версию проекта с исправлениями для macOS.

### Производственная сборка

1. **Сборка проекта**
```bash
npm run build
```

2. **Запуск production сервера**
```bash
npm start
```

## 🖥 Примеры использования

### API Endpoints

#### Получение списка объектов недвижимости
```bash
GET /api/properties?propertyType=квартира&district=Центральный&priceFrom=5000000&priceTo=15000000
```

#### Создание заявки (лида)
```bash
POST /api/leads
Content-Type: application/json

{
  "name": "Иван Петров",
  "phone": "+7 (912) 345-67-89",
  "email": "ivan@example.com",
  "serviceType": "купить",
  "propertyType": "квартира",
  "budget": "10-15 млн",
  "message": "Ищу 3-комнатную квартиру в центре"
}
```

#### Получение информации о новостройках
```bash
GET /api/new-buildings
```

### Пользовательский интерфейс

**Главная страница**: Поиск недвижимости, быстрые действия, калькулятор ипотеки
- URL: `/`

**Каталог недвижимости**: Фильтрация и просмотр объектов
- URL: `/buy`, `/secondary`, `/new-buildings`

**Страница услуг**: Детальная информация о дополнительных сервисах
- URL: `/services`, `/services/design-project`, `/services/renovation`

**Калькулятор ипотеки**: Интерактивный расчет платежей
- URL: `/calculator`

## 📊 Система логирования

Проект использует профессиональную систему логирования на базе **Winston** для мониторинга всех ключевых процессов.

### Структура логов
```
logs/
├── app.log          # Основные логи приложения
├── error.log        # Только ошибки и критические события
├── exceptions.log   # Необработанные исключения
└── rejections.log   # Отклоненные промисы
```

### Что логируется
- 🚀 **Запуск/остановка процессов**: инициализация сервера, подключение БД
- 🌐 **HTTP запросы**: все API endpoints с параметрами и временем выполнения
- ❌ **Ошибки**: с полным stack trace и контекстом
- 🎯 **Бизнес-события**: создание заявок, действия пользователей
- 🗄️ **База данных**: SQL запросы и подключения (при `LOG_SQL=true`)

### Настройка уровней логирования
```env
LOG_LEVEL=debug    # debug|info|warn|error
LOG_SQL=true       # Логирование SQL запросов
NODE_ENV=development
```

### Мониторинг в реальном времени
```bash
# Все логи
tail -f logs/app.log

# Только ошибки
tail -f logs/error.log

# Форматированный JSON
tail -f logs/app.log | jq .
```

## 📋 Зависимости

### Основные зависимости (dependencies)
```json
{
  "@tanstack/react-query": "^5.60.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "wouter": "^3.3.5",
  "drizzle-orm": "^0.39.1",
  "express": "^4.21.2",
  "zod": "^3.24.2",
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "множественные компоненты",
  "framer-motion": "^11.13.1",
  "lucide-react": "^0.453.0"
}
```

### Зависимости разработки
```json
{
  "@vitejs/plugin-react": "^4.3.2",
  "typescript": "5.6.3",
  "vite": "^5.4.14",
  "drizzle-kit": "^0.30.4",
  "esbuild": "^0.25.0",
  "tsx": "^4.19.1",
  "@types/express": "4.17.21",
  "@types/react": "^18.3.11",
  "@types/winston": "^2.4.4"
}
```

## 🚀 Деплой на хостинг

Проект готов к деплою на популярные хостинг-платформы:

### Render.com
```bash
# Build Command
npm run build

# Start Command  
npm start

# Environment Variables
DATABASE_URL=your_postgres_url
NODE_ENV=production
```

### Vercel
```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

### Railway
```bash
# Подключите GitHub репозиторий
# Railway автоматически определит настройки

# Environment Variables в панели Railway:
# DATABASE_URL=your_postgres_url
# NODE_ENV=production
```

### DigitalOcean App Platform
```yaml
# app.yaml
name: realtyspb
services:
- build_command: npm run build
  environment_slug: node-js
  github:
    branch: main
    repo: your-username/RealtySpb
  name: realtyspb-app
  run_command: npm start
  source_dir: /
```

## 📄 Лицензия

Данный проект распространяется под лицензией **MIT**. 

MIT License предоставляет право использовать, копировать, изменять, объединять, публиковать, распространять, сублицензировать и/или продавать копии программного обеспечения при условии включения уведомления об авторских правах и данного разрешения во все копии или существенные части программного обеспечения.

---

## 👥 Команда разработки

Проект разработан профессиональной командой с опытом работы в сфере недвижимости и веб-разработки более 15 лет.

## 📞 Поддержка

При возникновении вопросов или предложений по улучшению платформы, пожалуйста, создайте issue в репозитории или свяжитесь с командой разработки.

**Сайт**: [RealtySpb Platform](http://localhost:3000)  
**Техническая поддержка**: Создайте issue в GitHub репозитории 

## 🐛 Решение проблем

### Ошибки запуска на macOS
**Проблема**: `Error: listen ENOTSUP: operation not supported on socket 0.0.0.0:3000`

**Решение**: В версии проекта исправлена проблема с запуском на macOS. Сервер теперь слушает `localhost` вместо `0.0.0.0` с отключенной опцией `reusePort`.

**Технические детали**: 
- Изменен файл `server/index.ts`
- Заменено `server.listen({host: "0.0.0.0", reusePort: true})` на `server.listen(port, "localhost")`
- Это обеспечивает совместимость с сетевым стеком macOS

### Ошибки подключения к БД:
```bash
# Проверка статуса PostgreSQL
brew services list | grep postgresql  # на macOS
sudo systemctl status postgresql      # на Linux

# Перезапуск PostgreSQL
brew services restart postgresql      # на macOS
sudo systemctl restart postgresql     # на Linux
```

### Ошибки порта:
Если порт 3000 занят:
```bash
# Поиск процесса на порту 3000
lsof -i :3000

# Остановка процесса
kill -9 <PID>
```

### Установка PostgreSQL на macOS:
```bash
# Установка Homebrew (если не установлен)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Добавление Homebrew в PATH
eval "$(/opt/homebrew/bin/brew shellenv)"

# Установка PostgreSQL
brew install postgresql@14

# Запуск службы
brew services start postgresql@14

# Создание базы данных
createdb realtyspb
```

### Ошибки переменных окружения:
Если переменные не загружаются из `.env`:
```bash
# Экспорт переменных вручную
export DATABASE_URL="postgresql://mac@localhost:5432/realtyspb"
export NODE_ENV="development"
npm run dev
```

### Ошибки миграций:
```bash
# Очистка и повторное применение схемы
npm run db:push
```

## 🔍 Проверка работоспособности

После запуска проверьте:

1. **Веб-интерфейс**: `http://localhost:3000`
2. **API здоровья**: `http://localhost:3000/api/properties` (должен вернуть JSON)
3. **База данных**: выполните SQL запрос для проверки таблиц:
```sql
\dt  -- список таблиц в PostgreSQL
```

4. **Логи сервера**: должны показывать успешные API запросы:
```
8:38:32 PM [express] serving on port 3000
8:39:18 PM [express] GET /api/properties 200 in 3ms :: [{"id":1,"title":"3-комнатная квартира в цент…
8:39:18 PM [express] GET /api/new-buildings 200 in 1ms :: [{"id":15,"name":"ЖК Северный Парк","descr…
8:39:18 PM [express] GET /api/services 200 in 1ms :: [{"id":21,"name":"Предпродажная подготовка","de…
```

## 🔧 Системные требования

### Совместимость
- **macOS**: Полностью поддерживается (включая Apple Silicon M1/M2)
- **Linux**: Ubuntu 18+, CentOS 7+, Debian 9+
- **Windows**: Windows 10/11 с WSL2

### Протестировано на:
- **Node.js**: v18.x, v20.x, v22.x
- **PostgreSQL**: v13, v14, v15
- **macOS**: Sonoma 14.x, Sequoia 15.x

## ⚠️ Важные примечания

### Архитектурные изменения
Проект был очищен от Replit-специфичных зависимостей и оптимизирован для универсального деплоя:
- **Удалены**: `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-runtime-error-modal`
- **Упрощен**: `vite.config.ts` для стандартной конфигурации
- **Унифицирован**: `package.json` для работы на любых платформах

### macOS специфика
Проект содержит исправления для корректной работы на macOS:
- Исправлена проблема с `ENOTSUP` при прослушивании сокетов
- Оптимизированы настройки сервера для сетевого стека macOS
- Добавлена поддержка Apple Silicon процессоров

### Переменные окружения
Убедитесь, что файл `.env` корректно загружается. В некоторых случаях может потребоваться ручной экспорт переменных.

### База данных
При первом запуске убедитесь, что:
- PostgreSQL запущен и доступен
- База данных `realtyspb` создана
- Пользователь имеет права на создание таблиц

### Совместимость с хостингами
Проект протестирован и совместим с:
- ✅ **Render.com** - успешный деплой
- ✅ **Vercel** - поддержка Serverless Functions
- ✅ **Railway** - автоматическое определение настроек
- ✅ **DigitalOcean** - App Platform
- ✅ **Heroku** - при наличии PostgreSQL addon
- ✅ **AWS/GCP** - через Docker или прямой деплой

## 🚀 Быстрый старт для macOS

```bash
# Полная установка с нуля на macOS
# 1. Установка Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Настройка PATH
eval "$(/opt/homebrew/bin/brew shellenv)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# 3. Установка зависимостей
brew install postgresql@14 node

# 4. Запуск PostgreSQL
brew services start postgresql@14

# 5. Настройка проекта
git clone <repository-url>
cd RealtySpb
npm install

# 6. Создание базы данных
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"
createdb realtyspb

# 7. Настройка переменных окружения
echo "DATABASE_URL=postgresql://$(whoami)@localhost:5432/realtyspb" > .env
echo "NODE_ENV=development" >> .env

# 8. Инициализация схемы БД
npm run db:push

# 9. Запуск приложения
npm run dev
```

