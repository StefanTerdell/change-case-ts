import "@std/dotenv/load";
import { changeCase } from "@stefan/change-case-ts";
import z from "zod";

const envSchema = z.object({
  MY_ENV_VAR: z.string(),
});

const camelCaseEnvSchema = envSchema.transform((vars) =>
  changeCase(vars, "camelCase")
);

const env = camelCaseEnvSchema.parse(Deno.env.toObject());

env satisfies {
  myEnvVar: string;
};

console.log(env.myEnvVar);
