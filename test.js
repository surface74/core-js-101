/*  const builder = cssSelectorBuilder;
*
*  builder.id('main').class('container').class('editable').stringify()
*    => '#main.container.editable'
*
*  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
*    => 'a[href$=".png"]:focus'
*
*  builder.combine(
*      builder.element('div').id('main').class('container').class('draggable'),
*      '+',
*      builder.combine(
*          builder.element('table').id('data'),
*          '~',
*           builder.combine(
*               builder.element('tr').pseudoClass('nth-of-type(even)'),
*               ' ',
*               builder.element('td').pseudoClass('nth-of-type(even)')
*           )
*      )
*  ).stringify()
*    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
*
*  For more examples see unit tests.
*/
function CssElement(value) {
  this.value = value;
  this.stringify = () => this.value;
}

function CssId(value) {
  this.value = value;
  this.stringify = () => `#${this.value}`;
}

function CssClass(value) {
  this.value = value;
  this.stringify = () => `.${this.value}`;
}

function CssAttr(value) {
  this.value = value;
  this.stringify = () => `[${this.value}]`;
}

function CssPseudoClass(value) {
  this.value = value;
  this.stringify = () => `:${this.value}`;
}

function CssPseudoElement(value) {
  this.value = value;
  this.stringify = () => `::${this.value}`;
}

const cssSelectorBuilder = {
  cssSelector: '',

  element(value) {
    this.cssSelector = ((new CssElement(value)).stringify());
    return { ...this };
  },

  id(value) {
    this.cssSelector += ((new CssId(value)).stringify());
    return { ...this };
  },

  class(value) {
    this.cssSelector += ((new CssClass(value)).stringify());
    return { ...this };
  },

  attr(value) {
    this.cssSelector += ((new CssAttr(value)).stringify());
    return { ...this };
  },

  pseudoClass(value) {
    this.cssSelector += ((new CssPseudoClass(value)).stringify());
    return { ...this };
  },

  pseudoElement(value) {
    this.cssSelector += ((new CssPseudoElement(value)).stringify());
    return { ...this };
  },

  combine(selector1, combinator, selector2) {
    const selector = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;

    this.cssSelector = selector;
    return { ...this };
  },

  stringify() {
    return this.cssSelector;
  },
};

const builder = cssSelectorBuilder;
console.log(builder.element('div').stringify());
console.log(builder.id('nav-bar').stringify());
// console.log(builder.element('div').id('main').stringify());
// console.log(builder.combine(
//   builder.element('div').id('main').class('container').class('draggable'),
//   '+',
//   builder.element('table').id('data')
// ).stringify());
// console.log(builder.combine(
//   builder.element('div').id('main').class('container').class('draggable'),
//   '+',
//   builder.combine(
//     builder.element('table').id('data'),
//     '~',
//     builder.combine(
//       builder.element('tr').pseudoClass('nth-of-type(even)'),
//       ' ',
//       builder.element('td').pseudoClass('nth-of-type(even)'),
//     ),
//   ),
// ).stringify());

// => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
