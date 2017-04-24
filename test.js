const grammar = require("./gram.js");
const nearley = require("nearley");
const R = require('ramda');
const { toHTML } = require('./utils.js')

// Create a Parser object from our grammar.
const p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

const flattenAndJoin = R.compose(R.join(''), R.flatten);

const parsingTest = (gram, text) => {
  const res = new nearley.Parser(gram.ParserRules, gram.ParserStart)
  .feed(text)
  .results;

  if (res.length > 1) { throw new Error(`ambiguous result\n\n${toHTML(res)}`); }

  return toHTML(res);
};

const inlineTest = (exp, res) => () =>
    expect(parsingTest(grammar, exp)).toBe(res);

test('simple italic', inlineTest('a*ita*b', 'a<i>ita</i>b'));
test('italic from start', inlineTest('*ita*bddd', '<i>ita</i>bddd'));
test('italic and italic', inlineTest('*ita**ita2*', '<i>ita</i><i>ita2</i>'));
test('italic and bold', inlineTest('*ita***bold**', '<i>ita</i><b>bold</b>'));
test('text italic bold text', inlineTest('a*ita***bold**b', 'a<i>ita</i><b>bold</b>b'));
test('text italic bold multiline', inlineTest(`
a
*ita*b
**bold**
b`,
`
a
<i>ita</i>b
<b>bold</b>
b`
));
test('italic with inline code inside', inlineTest('a*toto`toto*to`to`*b', 'a<i>toto<code>toto*to`to</code></i>b'));
test('with code block', inlineTest(`
a
\`\`\`javascript
toto
\`\`\`
b
`,
`
a
<code data-language="javascript">toto</code>
b
`));
test('with ### title', inlineTest(`
a
### title
b
`, `
a
<h3>title</h3>
b
`))
