import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('₽', '₽');
}

export function formatPricePerMeter(price: number): string {
  return `${formatPrice(price)}/м²`;
}

export function formatArea(area: string | number): string {
  return `${area} м²`;
}

export function formatFloor(floor: number, totalFloors: number): string {
  return `${floor}/${totalFloors} этаж`;
}

export function formatRooms(rooms: number): string {
  const roomWords = ['комната', 'комнаты', 'комнат'];
  const lastDigit = rooms % 10;
  const lastTwoDigits = rooms % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${rooms} ${roomWords[2]}`;
  }
  
  if (lastDigit === 1) {
    return `${rooms} ${roomWords[0]}`;
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${rooms} ${roomWords[1]}`;
  }
  
  return `${rooms} ${roomWords[2]}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
