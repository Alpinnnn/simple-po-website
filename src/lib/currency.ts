/**
 * Utility untuk format mata uang
 */

// Konfigurasi mata uang dari environment variables dengan fallback ke USD
const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
const CURRENCY_CODE = process.env.NEXT_PUBLIC_CURRENCY_CODE || 'USD';
const CURRENCY_LOCALE = process.env.NEXT_PUBLIC_CURRENCY_LOCALE || 'en-US';

/**
 * Format nilai menjadi string mata uang
 * @param value - Nilai yang akan diformat
 * @param options - Opsi tambahan formatting
 * @returns String mata uang yang diformat
 */
export function formatCurrency(value: number, options: Partial<Intl.NumberFormatOptions> = {}): string {
  const formatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  });

  return formatter.format(value);
}

/**
 * Format nilai menjadi string mata uang sederhana hanya dengan simbol
 * @param value - Nilai yang akan diformat
 * @returns String mata uang yang diformat dengan simbol saja
 */
export function formatSimpleCurrency(value: number): string {
  return `${CURRENCY_SYMBOL}${value.toFixed(2)}`;
}

/**
 * Mendapatkan simbol mata uang
 * @returns Simbol mata uang
 */
export function getCurrencySymbol(): string {
  return CURRENCY_SYMBOL;
}

/**
 * Mendapatkan kode mata uang
 * @returns Kode mata uang
 */
export function getCurrencyCode(): string {
  return CURRENCY_CODE;
}

export const CurrencySettings = {
  symbol: CURRENCY_SYMBOL,
  code: CURRENCY_CODE,
  locale: CURRENCY_LOCALE,
}; 