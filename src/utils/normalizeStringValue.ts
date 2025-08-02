export const normalizeStringValue = (val: string): string => {
  return val
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};
