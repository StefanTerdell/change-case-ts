import "@std/dotenv/load";
import { caseChanger } from "@stefan/change-case-ts";
import z from "zod";

const envSchema = z.object({
  MY_ENV_VAR: z.string(),
});

const camelCaseEnvSchema = envSchema.transform(
  caseChanger("camelCase"),
);

const env = camelCaseEnvSchema.parse(Deno.env.toObject());

env satisfies {
  myEnvVar: string;
};

console.log(env.myEnvVar);
