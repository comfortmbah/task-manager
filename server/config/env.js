import "dotenv/config";

const requiredEnvVariables = [
  "JWT_SECRET",
  "CLIENT_URL",
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}