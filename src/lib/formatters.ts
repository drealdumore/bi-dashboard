// Format a number as a currency (USD)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Format a number as a percentage
export function formatPercentage(value: number, decimalPlaces = 1): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

// Format a date string (YYYY-MM-DD) to a more readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

// Format a number with comma separators
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

// Format a decimal to a specified number of decimal places
export function formatDecimal(value: number, decimalPlaces = 2): string {
  return value.toFixed(decimalPlaces);
}

// Format a number with abbreviated thousands (K) and millions (M)
export function formatCompact(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}
