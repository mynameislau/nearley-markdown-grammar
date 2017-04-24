const R = require('ramda');


const conversion = node => {
  switch (node.type) {
    case 'italic':
      return `<i>${convertList(node.data)}</i>`;
    case 'bold':
      return `<b>${convertList(node.data)}</b>`;
    case 'inlineCode':
      return `<code>${node.data}</code>`;
    case 'codeBlock':
      return `\n<code data-language="${node.language}">${convertList(node.data)}</code>`
    case 'text':
      return node.data;
    case 'title':
      console.dir(node, {depth:  null})
      return `\n<h${node.level}>${node.data}</h${node.level}>\n`;
    default:
      return node;
  }
};

const convertList = R.compose(
  R.join(''),
  R.map(conversion),
  R.flatten
);

module.exports.toHTML = convertList;
