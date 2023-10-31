// Project specific environment variables

export const ENVS = {
  DEV: "development",
  PROD: "production",
} as const;

export default {
  project_name: "Web Sockets",
  db: "mongodb://localhost:27017/web-sockets",
  cors: {
    origin: "*",
    credentials: true,
  },
  port: 3000,
  ENV: ENVS.DEV,
} as const;
