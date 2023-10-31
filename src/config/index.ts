// TODO :: Everything in uppercase is a constant
// TODO :: Get vars from .env file
import env from "./env";
import roles, * as rolesExtra from "./roles";
import * as hashing from "./hashing";
import * as TOKENS from "./tokens";

export default {
  ...env,
  ...rolesExtra,
  ...hashing,
  TOKENS,
  roles,
};

export { env, rolesExtra as roles, hashing, TOKENS };
