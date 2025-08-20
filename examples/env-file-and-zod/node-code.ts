import "dotenv/config";
import { changeCase } from "change-case-ts";
import z from "zod";

const envSchema = z.object({
  MY_ENV_VAR: z.string(),
});

const camelCaseEnvSchema = envSchema.transform((vars) =>
  changeCase(vars, "camelCase")
);

const env = camelCaseEnvSchema.parse(process.env);

env satisfies {
  myEnvVar: string;
};

console.log(env.myEnvVar);
