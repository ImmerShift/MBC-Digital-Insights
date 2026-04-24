export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `IDR ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `IDR ${(value / 1000).toFixed(1)}k`;
  }
  return `IDR ${value}`;
};
