import dotenv from "dotenv";
import fs from "fs";

// checking if .env file is available
if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
} else {
    console.error(".env file not found.");
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
