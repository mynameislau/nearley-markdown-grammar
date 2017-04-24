# ne marche pas  : erg*gregre**gregre*

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

delimitedGroupA ->
  ita
  | bold

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

inlineCode -> "`" [\S]:+ "`" {% code %}

text -> [^*`]:+ {% text %}

@{%

const typed = type => data => ({ type, data})

const dataToString = data => data.join('').split(',').join('');

const stripDelimiters = data =>
  dataToString(data.slice(1, -1));

const ita = (data, location, reject) =>
  `<i>${stripDelimiters(data)}</i>`;

const code = data =>
  `<code>${stripDelimiters(data)}</code>`

const bold = data =>
`<b>${stripDelimiters(data)}</b>`;

const text = (data, location, reject) =>
  `${dataToString(data)}`;

%}
