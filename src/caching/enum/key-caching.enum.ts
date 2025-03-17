export enum KEY_CACHING_ENUM {
  CATEGORIA_PRODUCT = 'CATEGORIA_PRODUCT',
  TOTAL_COUNT_PRODUCT = 'COUNT_PRODUCT',
  FIRST_PAGE_PRODUCT = 'FIRST_PAGE_PRODUCT',
  SEARCH_PRODUCT_CATEGORY = 'SEARCH_PRODUCT_CATEGORY',
}

export const TIMESTAMP_CACHING = Object.freeze({
  MIN_10: 10 * 60 * 1000, // 10 minutos
  MIN_30: 30 * 60 * 1000, // 30 minutos
  HOUR_1: 60 * 60 * 1000, // 1 hora
  HOURS_3: 3 * 60 * 60 * 1000, // 3 horas
  HOURS_12: 12 * 60 * 60 * 1000, // 12 horas
  HOURS_24: 24 * 60 * 60 * 1000, // 24 horas
});
