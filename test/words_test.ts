import { stringToWords, wordsToString } from "../src/words.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("stringToWords", () => {
  Deno.test("stringToWords - camelCase", () => {
    assertEqualsT(
      stringToWords("camelCase", "helloWorld"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWords - PascalCase", () => {
    assertEqualsT(
      stringToWords("PascalCase", "HelloWorld"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWords - lowercase", () => {
    assertEqualsT(
      stringToWords("lowercase", "helloworld"),
      ["helloworld"],
    );
  });

  Deno.test("stringToWords - UPPERCASE", () => {
    assertEqualsT(
      stringToWords("UPPERCASE", "HELLOWORLD"),
      ["helloworld"],
    );
  });

  Deno.test("stringToWords - snake_case", () => {
    assertEqualsT(
      stringToWords("snake_case", "hello_world"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWords - UPPER_SNAKE_CASE", () => {
    assertEqualsT(
      stringToWords("UPPER_SNAKE_CASE", "HELLO_WORLD"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWords - SCREAMING_SNAKE_CASE", () => {
    assertEqualsT(
      stringToWords("SCREAMING_SNAKE_CASE", "HELLO_WORLD"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWords - CONSTANT_CASE", () => {
    assertEqualsT(
      stringToWords("CONSTANT_CASE", "HELLO_WORLD"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWordskebab- - case", () => {
    assertEqualsT(
      stringToWords("kebab-case", "hello-world"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWordsUPPER-KEBAB- - CASE", () => {
    assertEqualsT(
      stringToWords("UPPER-KEBAB-CASE", "HELLO-WORLD"),
      ["hello", "world"],
    );
  });

  Deno.test("stringToWordsSCREAMING-KEBAB- - CASE", () => {
    assertEqualsT(
      stringToWords("SCREAMING-KEBAB-CASE", "HELLO-WORLD"),
      ["hello", "world"],
    );
  });
});

Deno.test("wordsToString", () => {
  Deno.test("wordsToString - camelCase", () => {
    assertEqualsT(
      wordsToString("camelCase", ["hello", "world"]),
      "helloWorld",
    );
  });

  Deno.test("wordsToString - PascalCase", () => {
    assertEqualsT(
      wordsToString("PascalCase", ["hello", "world"]),
      "HelloWorld",
    );
  });

  Deno.test("wordsToString - lowercase", () => {
    assertEqualsT(
      wordsToString("lowercase", ["helloworld"]),
      "helloworld",
    );
  });

  Deno.test("wordsToString - UPPERCASE", () => {
    assertEqualsT(
      wordsToString("UPPERCASE", ["helloworld"]),
      "HELLOWORLD",
    );
  });

  Deno.test("wordsToString - snake_case", () => {
    assertEqualsT(
      wordsToString("snake_case", ["hello", "world"]),
      "hello_world",
    );
  });

  Deno.test("wordsToString - UPPER_SNAKE_CASE", () => {
    assertEqualsT(
      wordsToString("UPPER_SNAKE_CASE", ["hello", "world"]),
      "HELLO_WORLD",
    );
  });

  Deno.test("wordsToString - SCREAMING_SNAKE_CASE", () => {
    assertEqualsT(
      wordsToString("SCREAMING_SNAKE_CASE", ["hello", "world"]),
      "HELLO_WORLD",
    );
  });

  Deno.test("wordsToString - CONSTANT_CASE", () => {
    assertEqualsT(
      wordsToString("CONSTANT_CASE", ["hello", "world"]),
      "HELLO_WORLD",
    );
  });

  Deno.test("wordsToString - kebab-case", () => {
    assertEqualsT(
      wordsToString("kebab-case", ["hello", "world"]),
      "hello-world",
    );
  });

  Deno.test("wordsToString - UPPER-KEBAB-CASE", () => {
    assertEqualsT(
      wordsToString("UPPER-KEBAB-CASE", ["hello", "world"]),
      "HELLO-WORLD",
    );
  });

  Deno.test("wordsToString - SCREAMING-KEBAB-CASE", () => {
    assertEqualsT(
      wordsToString("SCREAMING-KEBAB-CASE", ["hello", "world"]),
      "HELLO-WORLD",
    );
  });
});
