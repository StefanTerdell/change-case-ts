const template = Deno.readTextFileSync("./examples/readme-template.md");

let readmeNode = template;
let readmeDeno = template;
let readme = template;

function codeBlock(code: string, language: "ts" | "sh"): string {
  return "```" + `${language}\n${code}` + "```";
}

function tryRead(path: string): string | undefined {
  try {
    return Deno.readTextFileSync(path);
  } catch {
    return undefined;
  }
}

for (const [match] of template.matchAll(/\{{3}[a-zA-Z\-\/]+\}{3}/g)) {
  // console.log(match);

  let matchPath = match.substring(3, match.length - 3);
  if (!matchPath.endsWith("/")) {
    matchPath = matchPath + "/";
  }

  let nodeSetup = tryRead(matchPath + "node-setup.sh");
  nodeSetup = nodeSetup && codeBlock(nodeSetup, "sh");
  let nodeCode = tryRead(matchPath + "node-code.ts");
  nodeCode = nodeCode && codeBlock(nodeCode, "ts");

  let denoSetup = tryRead(matchPath + "deno-setup.sh");
  denoSetup = denoSetup && codeBlock(denoSetup, "sh");
  let denoCode = tryRead(matchPath + "deno-code.ts");
  denoCode = denoCode && codeBlock(denoCode, "ts");

  const node = nodeSetup && nodeCode
    ? `${nodeSetup}\n\n${nodeCode}`
    : nodeSetup || nodeCode || "MISSING EXAMPLE";

  const deno = denoSetup && denoCode
    ? `${denoSetup}\n\n${denoCode}`
    : denoSetup || denoCode || "MISSING EXAMPLE";

  readmeNode = readmeNode.replaceAll(match, node);
  readmeDeno = readmeDeno.replaceAll(match, deno);
  readme = readme.replaceAll(
    match,
    `
<details>
<summary>Node/NPM</summary>

${node}
</details>

<details>
<summary>Deno/JSR</summary>

${deno}
</details>
`,
  );
}

Deno.writeTextFileSync("README-NODE.md", readmeNode);
Deno.writeTextFileSync("README-DENO.md", readmeDeno);
Deno.writeTextFileSync("README.md", readme);
