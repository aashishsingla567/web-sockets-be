export const TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;

export type TokenType = (typeof TYPES)[keyof typeof TYPES];

// TODO :: Times in correct format
export const EXPIRY = {
  ACCESS: "15 min",
  REFRESH: "5 min",
} as const;
