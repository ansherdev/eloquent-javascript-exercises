const text = "'I'm the cook,' he said, 'it's my job.'";

const regexp = /(^|\W)'|'(\W|$)/g;


console.log(text.replace(regexp, '$1"$2'))