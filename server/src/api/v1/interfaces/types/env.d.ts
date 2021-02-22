declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_USERNAME: string;
    DB_PASS: string;
    CORS_ORIGIN: string;
    DB_NAME: string;
    SESSION_SECRET: string;
  }
}
