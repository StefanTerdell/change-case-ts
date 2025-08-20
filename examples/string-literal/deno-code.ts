import { changeCase } from "@stefan/change-case-ts";

const stringLiteral = changeCase("howAboutThemApples", "SCREAMING-KEBAB-CASE");

stringLiteral satisfies "HOW-ABOUT-THEM-APPLES";
