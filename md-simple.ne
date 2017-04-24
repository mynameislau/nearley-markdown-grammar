# ne marche pas  : erg*gregre**gregre*

main ->
  stuff
  | null

stuff ->
  delimitedStuff
  | textStuff

textStuff ->
  text delimitedStuff
  | text

delimitedStuff ->
  delimited stuff
  | delimited

delimited ->
  ita
  | bold

any -> delimited | text

ita -> "*" text "*" {% ita %}

bold -> "**" text "**" {% bold %}

text -> [^*]:+ {% text %}

@{%

const typed = (type) => (data) => ({ type, data})

const dataToString = data => data.join('').split(',').join('');

const bold = (data) =>
  `<b>${dataToString(data.slice(1, -1))}</b>`;

const ita = (data, location, reject) => {
  return `<i>${dataToString(data.slice(1, -1))}</i>`;
}

const text = (data, location, reject) => {
  return `${dataToString(data)}`;
}

%}
