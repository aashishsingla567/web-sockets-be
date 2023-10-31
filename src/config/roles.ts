const roles = ["user", "admin"] as const;
export type Role = (typeof roles)[number];

export const MAX_ADMIN_COUNT = 1;

export default roles;
