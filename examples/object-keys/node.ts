import { changeCase } from "change-case-ts";

const objectKeys = changeCase(
  {
    some_number: 123,
    an_array: [
      {
        with_a_prop: true,
      },
    ],
  },
  "camelCase",
);

objectKeys satisfies {
  someNumber: 123;
  anArray: [{
    withAProp: true;
  }];
};
