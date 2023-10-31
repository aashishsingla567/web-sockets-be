import crypto from "crypto";
import config from "../config";
const { PASSWORD } = config;

const makePasswordHash = (password: string, email: string) => {
  const salt = crypto.randomBytes(5).toString("hex");
  const hash = crypto
    .pbkdf2Sync(
      password,
      salt + email,
      PASSWORD.HASH_ROUNDS,
      PASSWORD.KEY_LENGTH,
      PASSWORD.ALGO
    )
    .toString(PASSWORD.ENCODING);
  return { salt, hash };
};

export default makePasswordHash;
