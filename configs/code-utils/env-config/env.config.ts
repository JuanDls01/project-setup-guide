import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is mandatory"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is mandatory"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is mandatory"),
  API_USERNAME: z.string().min(1).default("juanidls"),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("❌ Error in environment variables: ", error.format());
  process.exit(1);
}

const {
  AUTH_SECRET: authSecret,
  GOOGLE_CLIENT_ID: googleClientId,
  GOOGLE_CLIENT_SECRET: googleClientSecret,
  API_USERNAME,
} = data;
