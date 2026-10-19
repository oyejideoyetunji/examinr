process.loadEnvFile();

import type { MigrationConfig } from "drizzle-orm/xata-http/migrator";


function getEnvVar(key: string) {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Failed to load env variable ${key}`);
    }

    return value;
}

const port = getEnvVar("PORT");
const url = getEnvVar("DB_URL");
const platform = getEnvVar("PLATFORM");

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
};

type APIConfig = {
    port: number;
    platform: string;
};

type Config = {
    db: DBConfig;
    api: APIConfig;
};

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db",
};

const db: DBConfig = {
    url,
    migrationConfig,
};

const api: APIConfig = {
    port: Number(port),
    platform
};

export const config: Config = {
    db,
    api
};

