declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGUSER: string;
      PGHOST: string;
      PGPASSWORD: string;
      PGDATABASE: string;
      PGPORT: number;
      PORT: number;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
