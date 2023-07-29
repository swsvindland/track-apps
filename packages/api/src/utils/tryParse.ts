export const tryParseFloat = (value: string) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0.0 : parsed;
};

export const tryParseInt = (value: string) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};
