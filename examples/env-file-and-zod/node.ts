import "dotenv/config";
import { caseChanger } from "change-case-ts";
import z from "zod";

const envSchema = z.object({
  MY_ENV_VAR: z.string(),
});

const camelCaseEnvSchema = envSchema.transform(
  caseChanger("camelCase"),
);

const env = camelCaseEnvSchema.parse(process.env);

env satisfies {
  myEnvVar: string;
};

console.log(env.myEnvVar);
