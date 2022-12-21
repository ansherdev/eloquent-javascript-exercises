const verify = (regexp, strings) => {
  let arr = strings;

  if (!Array.isArray(arr)) {
    arr = [arr];
  }

  for (const str of arr) {
    const match = str.match(regexp);

    if (!match) {
      console.log(`No match for "${str}"`);
      continue;
    }

    console.log(`Match for "${str}": [${match}]`);
  }

  console.log("\n");
};

const carCatRegExp = /ca[rt]/g;
const carCatStrings = ["my car", "bad cats", "camper", "high art"];
verify(carCatRegExp, carCatStrings);

const popPropRegExp = /pr?op/g;
const popPropStrings = ["pop culture", "mad props", "plop", "prrrop"];
verify(popPropRegExp, popPropStrings);

const ferrRegExp = /ferr(et|y|ari)/g;
const ferrStrings = ["ferret", "ferry", "ferrari", "ferrum", "transfer A"];
verify(ferrRegExp, ferrStrings);

const iousRegExp = /\b(\w+)?ious\b/;
const iousStrings = [
  "how delicious",
  "spacious room",
  "ruinous",
  "consciousness",
];
verify(iousRegExp, iousStrings);

const whitespacePunctuationRegExp = /\s[\.,:;]/;
const whitespacePunctuationStrings = ["bad punctuation .", "escape the period"];
verify(whitespacePunctuationRegExp, whitespacePunctuationStrings);

const biggerThanSixRegExp = /\b\w{6,}\b/;
const biggerThanSixStrings = [
  "Siebentausenddreihundertzweiundzwanzig",
  "dasddd dsad ds",
  "dasdd",
  "no",
  "three small words",
];
verify(biggerThanSixRegExp, biggerThanSixStrings);

const eIgnoreRegExp = /\b[^\We]+\b/i;
const eIgnoreStrinigs = [
  "red platypus",
  "wobbling nest",
  "earth bed",
  "learning ape",
  "BEET",
];
verify(eIgnoreRegExp, eIgnoreStrinigs);
