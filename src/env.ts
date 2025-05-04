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
  VITE_GOOGLE_MAPS_API_KEY: z.string().min(1),
  VITE_ENABLE_MSW: z.string().transform((value) => value === "true"),
});

export const env = envSchema.parse(import.meta.env);
