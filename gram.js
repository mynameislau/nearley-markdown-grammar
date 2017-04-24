// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


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

var grammar = {
    ParserRules: [
    {"name": "main", "symbols": ["notEmpty"]},
    {"name": "main", "symbols": []},
    {"name": "notEmpty", "symbols": ["delimited", "notEmpty"]},
    {"name": "notEmpty", "symbols": ["delimited"]},
    {"name": "notEmpty", "symbols": ["text", "delimited", "notEmpty"]},
    {"name": "notEmpty", "symbols": ["text", "delimited"]},
    {"name": "notEmpty", "symbols": ["text"]},
    {"name": "delimited", "symbols": ["delimitedGroupA"]},
    {"name": "delimited", "symbols": ["delimitedGroupB"]},
    {"name": "delimitedGroupA", "symbols": ["ita"]},
    {"name": "delimitedGroupA", "symbols": ["bold"]},
    {"name": "delimitedGroupA", "symbols": ["codeBlock"]},
    {"name": "delimitedGroupA", "symbols": ["sharpTitle"]},
    {"name": "delimitedGroupB", "symbols": ["inlineCode"]},
    {"name": "insideGroupA", "symbols": ["delimitedGroupB", "insideGroupA"]},
    {"name": "insideGroupA", "symbols": ["delimitedGroupB"]},
    {"name": "insideGroupA", "symbols": ["text", "delimitedGroupB", "insideGroupA"]},
    {"name": "insideGroupA", "symbols": ["text", "delimitedGroupB"]},
    {"name": "insideGroupA", "symbols": ["text"]},
    {"name": "any", "symbols": ["delimited"]},
    {"name": "any", "symbols": ["text"]},
    {"name": "ita", "symbols": [{"literal":"*"}, "insideGroupA", {"literal":"*"}], "postprocess": ita},
    {"name": "bold$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bold$string$2", "symbols": [{"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bold", "symbols": ["bold$string$1", "insideGroupA", "bold$string$2"], "postprocess": bold},
    {"name": "sharpTitle$ebnf$1", "symbols": [{"literal":"#"}]},
    {"name": "sharpTitle$ebnf$1", "symbols": ["sharpTitle$ebnf$1", {"literal":"#"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sharpTitle$ebnf$2", "symbols": [/[\S]/]},
    {"name": "sharpTitle$ebnf$2", "symbols": ["sharpTitle$ebnf$2", /[\S]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sharpTitle", "symbols": [{"literal":"\n"}, "sharpTitle$ebnf$1", {"literal":" "}, "sharpTitle$ebnf$2", {"literal":"\n"}], "postprocess": sharpTitle},
    {"name": "codeBlock$string$1", "symbols": [{"literal":"\n"}, {"literal":"`"}, {"literal":"`"}, {"literal":"`"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "codeBlock$ebnf$1", "symbols": [/[\S]/]},
    {"name": "codeBlock$ebnf$1", "symbols": ["codeBlock$ebnf$1", /[\S]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "codeBlock$ebnf$2", "symbols": [/[\s\S]/]},
    {"name": "codeBlock$ebnf$2", "symbols": ["codeBlock$ebnf$2", /[\s\S]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "codeBlock$string$2", "symbols": [{"literal":"\n"}, {"literal":"`"}, {"literal":"`"}, {"literal":"`"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "codeBlock", "symbols": ["codeBlock$string$1", "codeBlock$ebnf$1", {"literal":"\n"}, "codeBlock$ebnf$2", "codeBlock$string$2"], "postprocess": codeBlock},
    {"name": "inlineCode$ebnf$1", "symbols": []},
    {"name": "inlineCode$ebnf$1", "symbols": ["inlineCode$ebnf$1", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "inlineCode", "symbols": [{"literal":"`"}, /[^`]/, "inlineCode$ebnf$1", {"literal":"`"}], "postprocess": inlineCode},
    {"name": "text$ebnf$1", "symbols": []},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1", /[^*`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "text", "symbols": [/[^*`\n]/, "text$ebnf$1"], "postprocess": text},
    {"name": "text$ebnf$2", "symbols": [/[^#*`]/]},
    {"name": "text$ebnf$2", "symbols": ["text$ebnf$2", /[^#*`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "text", "symbols": [{"literal":"\n"}, "text$ebnf$2"], "postprocess": text},
    {"name": "text", "symbols": [{"literal":"\n"}], "postprocess": text}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
