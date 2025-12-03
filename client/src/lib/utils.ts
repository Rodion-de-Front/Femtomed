import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Преобразует ссылку Яндекс Диска в URL прокси-эндпоинта для проигрывания
 * @param url - Ссылка на файл в Яндекс Диске (например, https://disk.yandex.ru/i/3jutR0G70MPUKg)
 * @returns URL прокси-эндпоинта для использования в <video> теге
 */
export function convertYandexDiskUrl(url: string): string {
  // Проверяем, является ли это ссылкой Яндекс Диска
  // Поддерживаем форматы:
  // - https://disk.yandex.ru/i/ID
  // - https://disk.yandex.ru/d/ID
  // - https://yadi.sk/i/ID
  // - https://yadi.sk/d/ID
  const yandexDiskMatch = url.match(
    /(?:disk\.yandex\.(?:ru|com)|yadi\.sk)\/(i|d)\/([a-zA-Z0-9_-]+)/
  );

  if (yandexDiskMatch) {
    // Используем прокси-эндпоинт на сервере для обхода CORS
    return `/api/video-proxy?url=${encodeURIComponent(url)}`;
  }

  // Если это не ссылка Яндекс Диска, возвращаем исходную ссылку
  return url;
}

/**
 * Проверяет, является ли ссылка ссылкой на Яндекс Диск
 */
export function isYandexDiskUrl(url: string): boolean {
  return /disk\.yandex\.(ru|com)/.test(url);
}
