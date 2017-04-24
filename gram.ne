main ->
  notEmpty
  | null

notEmpty ->
  delimited notEmpty
  | delimited
  | text delimited notEmpty
  | text delimited
  | text

delimited ->
  delimitedGroupA
  | delimitedGroupB

# groupA can contain groupB blocks

delimitedGroupA ->
  ita
  | bold
  | codeBlock
  | sharpTitle

delimitedGroupB ->
  inlineCode

insideGroupA ->
  delimitedGroupB insideGroupA
  | delimitedGroupB
  | text delimitedGroupB insideGroupA
  | text delimitedGroupB
  | text

any -> delimited | text

ita -> "*" insideGroupA "*" {% ita %}

bold -> "**" insideGroupA "**" {% bold %}

sharpTitle -> "\n" "#":+ " " [\S]:+ "\n" {% sharpTitle %}

codeBlock ->   "\n```" [\S]:+ "\n" [\s\S]:+ "\n```" {% codeBlock %}

inlineCode -> "`" [^`] [^\n]:* "`" {% inlineCode %}

text -> [^*`\n] [^*`]:* {% text %}
  | "\n" [^#*`]:+ {% text %}
  | "\n" {% text %}


@{%

const R = require('ramda');

const typed = R.curry((type, data) => ({ type, data}));

const dataToString = data => data.join('').split(',').join('');

const stripDelimiters = data =>
  data.slice(1, -1);

const ita = data => typed('italic', stripDelimiters(data));

const codeBlock = data => ({
  type: 'codeBlock',
  language: dataToString(data[1]),
  data: data.slice(3, -1)
});

const sharpTitle = data => ({
  type: 'title',
  level: data[1].length,
  data: dataToString(data[3])
})

const inlineCode = data => typed('inlineCode', stripDelimiters(dataToString(data)));

const bold = data => typed('bold', stripDelimiters(data));

const text = data => typed('text', dataToString(data));

%}
