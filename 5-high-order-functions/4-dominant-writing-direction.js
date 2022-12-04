import { SCRIPTS } from "./scripts.js";
import { HEBREW_TEXT, LATIN_TEXT } from "./text.js";

/* from book */
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

/* from book */
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

/* my solution */
export const getDominantWritingDirection = (text) => {
  const scripts = countBy(text, (char) => {
    const script = characterScript(char.charCodeAt(0));

    return script ? script.direction : null;
  }).filter(({ name }) => Boolean(name));

  if (scripts.length === 0) {
    return null;
  }

  const dominant = scripts.reduce((a, b) => {
    return a.count < b.count ? b : a;
  });

  return dominant.name;
};

console.log(getDominantWritingDirection("Hey, مساء الخير"));
