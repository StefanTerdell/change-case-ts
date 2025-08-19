import { build, emptyDir } from "@deno/dnt";

const { name, version, description, license } = await readDenoJson();

await emptyDir("./npm");

await build({
  entryPoints: ["./src/lib.ts"],
  outDir: "./npm",
  shims: {},
  test: false,
  package: {
    name: name.substring(name.indexOf("/") + 1),
    version,
    description,
    license,
    repository: {
      type: "git",
      url: "git+https://github.com/StefanTerdell/change-case-ts.git",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});

async function readDenoJson() {
  const content = await Deno.readFile("./deno.json");
  const decoder = new TextDecoder();
  const text = decoder.decode(content);
  const data = JSON.parse(text);

  if (typeof data !== "object" || data === null) {
    throw new Error(
      `Expected data to be an object and not null, got ${text}`,
    );
  }

  if (!("name" in data) || typeof data.name !== "string") {
    throw new Error(`Expected string 'name' in data, got ${text}`);
  }

  if (!("version" in data) || typeof data.version !== "string") {
    throw new Error(`Expected string 'version' in data, got ${text}`);
  }

  if (!("description" in data) || typeof data.description !== "string") {
    throw new Error(`Expected string 'description' in data, got ${text}`);
  }

  if (!("license" in data) || typeof data.license !== "string") {
    throw new Error(`Expected string 'license' in data, got ${text}`);
  }

  if (!data.name.startsWith("@") || data.name.indexOf("/") === -1) {
    throw new Error(
      `Expected 'name' to start with '@' and contain '/', got "${data.name}"`,
    );
  }

  if (!data.version) {
    throw new Error(`Expected 'version' to not be empty`);
  }

  if (!data.description) {
    throw new Error(`Expected 'description' to not be empty`);
  }

  if (!data.license) {
    throw new Error(`Expected 'license' to not be empty`);
  }

  return {
    name: data.name,
    version: data.version,
    description: data.description,
    license: data.license,
  };
}
