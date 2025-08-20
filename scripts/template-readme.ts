function main() {
  const template = Deno.readTextFileSync("./scripts/readme-template.md");

  let readmeNode = template;
  let readmeDeno = template;
  let readme = template;
  let docCommentContentDeno = template;
  let docCommentContentNode = template;

  for (const { match, path, title } of getExamples(template)) {
    const node = readExampleFiles(path, "node");
    const deno = readExampleFiles(path, "deno");

    console.log({
      match,
      path,
      title,
      node: Boolean(node),
      deno: Boolean(deno),
    });
    if (node) {
      readmeNode = readmeNode.replaceAll(match, withHeader(title, node));
      docCommentContentNode = docCommentContentNode.replaceAll(
        match,
        withTag(title, node),
      );
    }

    if (deno) {
      readmeDeno = readmeDeno.replaceAll(match, withHeader(title, deno));
      docCommentContentDeno = docCommentContentDeno.replaceAll(
        match,
        withTag(title, deno),
      );
    }

    const nodeDetails = wrapDetails("Node/NPM", node);
    const denoDetails = wrapDetails("Deno/JSR", deno);

    const details = nodeDetails && denoDetails
      ? `${nodeDetails}\n\n${denoDetails}`
      : nodeDetails || denoDetails;

    if (details) {
      readme = readme.replaceAll(match, withHeader(title, details));
    }
  }

  const docCommentNode = templateDocComment(docCommentContentNode, false);

  replaceDocComment("npm/src/lib.ts", docCommentNode);
  replaceDocComment("npm/esm/lib.d.ts", docCommentNode);
  replaceDocComment("npm/esm/lib.js", docCommentNode);
  replaceDocComment("npm/script/lib.d.ts", docCommentNode);
  replaceDocComment("npm/script/lib.js", docCommentNode);

  const docCommentDeno = templateDocComment(docCommentContentDeno, true);

  replaceDocComment("src/lib.ts", docCommentDeno);

  Deno.writeTextFileSync("README-NODE.md", readmeNode);
  Deno.writeTextFileSync("README-DENO.md", readmeDeno);
  Deno.writeTextFileSync("README.md", readme);
}

function codeBlock(
  code: string | undefined,
  language: "typescript" | "bash",
): string | undefined {
  return code ? "```" + `${language}\n${code}` + "```" : undefined;
}

function tryRead(path: string): string | undefined {
  try {
    return Deno.readTextFileSync(path);
  } catch {
    return undefined;
  }
}

function templateDocComment(content: string, addModuleTag: boolean): string {
  const lines = content.split("\n");

  if (addModuleTag) {
    lines.push("", "@module");
  }

  return `/**\n * ${lines.join("\n * ")}\n */`;
}

function replaceDocComment(path: string, comment: string) {
  let currentContent;

  try {
    currentContent = Deno.readTextFileSync(path);
  } catch {
    console.warn(`replaceDocComment: Failed to read file "${path}"`);
    return;
  }

  const startPattern = "/**";
  const startIndex = currentContent.indexOf(startPattern);

  if (startIndex === -1) {
    throw `Couldn't find start of current doc comment in '${path}'`;
  }

  const endPattern = "\n */";
  const endIndex = currentContent.indexOf(endPattern);

  if (endIndex === -1) {
    throw `Couldn't find end of current doc comment in '${path}'`;
  }

  const newContent = currentContent.substring(0, startIndex) + comment +
    currentContent.substring(endIndex + endPattern.length);

  Deno.writeTextFileSync(path, newContent);
}

function readExampleFiles(
  dir: string,
  prefix: "node" | "deno",
): string | undefined {
  if (!dir.endsWith("/")) {
    dir += "/";
  }

  const setup = codeBlock(tryRead(dir + prefix + ".sh"), "bash");
  const code = codeBlock(tryRead(dir + prefix + ".ts"), "typescript");

  if (setup && code) {
    return `Setup:\n\n${setup}\n\nCode:\n\n${code}`;
  }

  if (setup) {
    return setup;
  }

  if (code) {
    return code;
  }

  return undefined;
}

function wrapDetails(
  title: string,
  content: string | undefined,
): string | undefined {
  return content
    ? `<details>
<summary>${title}</summary>

${content}

</details>`
    : undefined;
}

function withHeader(title: string | undefined, content: string): string {
  return title ? `### ${title}\n\n${content}` : content;
}

function withTag(title: string | undefined, content: string): string {
  return title ? `@example ${title}\n\n${content}` : `@example\n\n${content}`;
}

function getExamples(template: string): IteratorObject<{
  match: string;
  path: string;
  title: string | undefined;
}> {
  return template.matchAll(/\{{3}.+\}{3}/g).map(([match]) => {
    const content = match.substring(3, match.length - 3);
    const [path, title] = content.split(",");

    return { match, path, title };
  });
}

main();
