import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["production", "development", "test"]),
  VITE_PORT: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error("Porta inválida");
      }
      return parsed;
    })
    .refine((val) => val >= 1000 && val <= 9999, {
      message: "Porta deve ser um número entre 1000 e 9999",
    }),
  VITE_DEFAULT_LAT: z.string().transform((latitude) => Number(latitude)),
  VITE_DEFAULT_LNG: z.string().transform((longitude) => Number(longitude)),
  VITE_GOOGLE_MAPS_API_KEY: z.string(),
  VITE_ENABLE_MSW: z.string().transform((value) => value === "true"),
  VITE_API_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
