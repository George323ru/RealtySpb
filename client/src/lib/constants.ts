export const PROPERTY_TYPES = [
  { value: "apartment", label: "Квартира" },
  { value: "house", label: "Дом" },
  { value: "commercial", label: "Коммерческая" },
  { value: "land", label: "Земля" },
  { value: "garage", label: "Гараж" },
  { value: "parking", label: "Машиноместо" },
];

export const TRANSACTION_TYPES = [
  { value: "sale", label: "Купить" },
  { value: "rent", label: "Снять" },
];

export const DISTRICTS = [
  "Центральный",
  "Василеостровский", 
  "Выборгский",
  "Калининский",
  "Кировский",
  "Колпинский",
  "Красногвардейский",
  "Красносельский",
  "Кронштадтский",
  "Курортный",
  "Московский",
  "Невский",
  "Петроградский",
  "Петродворцовый",
  "Приморский",
  "Пушкинский",
  "Фрунзенский",
  "Адмиралтейский",
];

export const BUILDING_CLASSES = [
  { value: "economy", label: "Эконом" },
  { value: "comfort", label: "Комфорт" },
  { value: "business", label: "Бизнес" },
  { value: "premium", label: "Премиум" },
];

export const RENOVATION_TYPES = [
  { value: "none", label: "Без ремонта" },
  { value: "cosmetic", label: "Косметический" },
  { value: "euro", label: "Евроремонт" },
  { value: "designer", label: "Дизайнерский" },
];

export const SERVICES = [
  {
    name: "Предпродажная подготовка",
    slug: "pre-sale-preparation",
    icon: "fas fa-hammer",
    color: "blue",
  },
  {
    name: "Дизайн-проект",
    slug: "design-project",
    icon: "fas fa-paint-brush",
    color: "purple",
  },
  {
    name: "Ремонт",
    slug: "renovation",
    icon: "fas fa-tools",
    color: "green",
  },
  {
    name: "Земля",
    slug: "land",
    icon: "fas fa-seedling",
    color: "green",
  },
  {
    name: "Строительство",
    slug: "construction",
    icon: "fas fa-building",
    color: "indigo",
  },
  {
    name: "Проектирование",
    slug: "design",
    icon: "fas fa-drafting-compass",
    color: "pink",
  },
  {
    name: "Инженерные системы",
    slug: "engineering-systems",
    icon: "fas fa-cogs",
    color: "teal",
  },
  {
    name: "Ландшафтный дизайн",
    slug: "landscape-design",
    icon: "fas fa-seedling",
    color: "emerald",
  },
  {
    name: "Юридическая проверка",
    slug: "legal-check",
    icon: "fas fa-balance-scale",
    color: "orange",
  },
  {
    name: "Сопровождение сделки",
    slug: "transaction-support",
    icon: "fas fa-handshake",
    color: "cyan",
  },
  {
    name: "Управление недвижимостью",
    slug: "property-management",
    icon: "fas fa-clipboard-list",
    color: "violet",
  },
  {
    name: "Комплектация мебелью",
    slug: "furniture-selection",
    icon: "fas fa-couch",
    color: "rose",
  },
];

export const PHONE_NUMBER = "+7 (812) 123-45-67";
export const EMAIL = "info@spb-realty.ru";
export const WORKING_HOURS = "Пн-Вс: 9:00-21:00";
export const TELEGRAM = "@spb_realty";
export const WHATSAPP = "+79123456789";
export const VK = "vk.com/spb_realty";
export const INSTAGRAM = "@spb_realty";

export const COMPANY_ADDRESS = "Невский проспект, 15, БЦ \"Северная Столица\", 5 этаж";
export const COMPANY_NAME = "риэлтор в СПБ";
export const COMPANY_TAGLINE = "realtorvspb.ru";

export const SERVICE_TYPES = [
  "Покупка недвижимости",
  "Продажа недвижимости", 
  "Аренда недвижимости",
  "Предпродажная подготовка",
  "Дизайн-проект",
  "Ремонт",
  "Земля",
  "Строительство",
  "Юридическая проверка",
  "Сопровождение сделки",
  "Управление недвижимостью",
  "Консультация риэлтора",
  "Оценка недвижимости"
];

export const CONTACT_INFO = {
  phone: PHONE_NUMBER,
  email: EMAIL,
  workingHours: WORKING_HOURS,
  telegram: TELEGRAM,
  whatsapp: WHATSAPP,
  vk: VK,
  instagram: INSTAGRAM,
  address: COMPANY_ADDRESS,
  companyName: COMPANY_NAME,
  tagline: COMPANY_TAGLINE
};
