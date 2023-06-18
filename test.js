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
  this.stringify = function foo() {
    return this.value;
  };
}
function CssId(value) {
  this.value = value;
  this.stringify = function foo() {
    return `#${this.value}`;
  };
}
function CssClass(value) {
  this.value = value;
  this.stringify = function foo() {
    return `#${this.value}`;
  };
}
function CssAttr(value) {
  this.value = value;
  this.stringify = function foo() {
    return `[${this.value}]`;
  };
}
function CssPseudoClass(value) {
  this.value = value;
  this.stringify = function foo() {
    return `:${this.value}`;
  };
}
function CssPseudoElement(value) {
  this.value = value;
  this.stringify = function foo() {
    return `::${this.value}`;
  };
}

const cssSelectorBuilder = {
  cssSelector: [],
  element(value) {
    // this.cssSelector.length = 0;
    this.cssSelector.push((new CssElement(value)).stringify());
    return this;
  },

  id(value) {
    this.cssSelector.push((new CssId(value)).stringify());
    return this;
  },

  class(value) {
    this.cssSelector.push((new CssClass(value)).stringify());
    return this;
  },

  attr(value) {
    this.cssSelector.push((new CssAttr(value)).stringify());
    return this;
  },

  pseudoClass(value) {
    this.cssSelector.push((new CssPseudoClass(value)).stringify());
    return this;
  },

  pseudoElement(value) {
    this.cssSelector.push((new CssPseudoElement(value)).stringify());
    return this;
  },

  combine(selector1, combinator, selector2) {
    const selector = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    // console.log('selector: ', selector);
    this.cssSelector.length = 0;
    this.cssSelector.push(selector);
    return this;
  },

  stringify() {
    const combinators = [' ', '+', '~', '>'];
    return this.cssSelector.map((item, index) => {
      if (!index || item[0] === ':') {
        return item;
      }
      if (combinators.includes(item)) {
        return ` ${item} `;
      }
      return `.${item}`;
    }).join('');
  },
};

const builder = cssSelectorBuilder;
// console.log(builder.element('div').id('main').stringify());
console.log(builder.combine(
  builder.element('div').id('main').class('container').class('draggable'),
  '+',
  builder.combine(
    builder.element('table').id('data'),
    '~',
    builder.combine(
      builder.element('tr').pseudoClass('nth-of-type(even)'),
      ' ',
      builder.element('td').pseudoClass('nth-of-type(even)'),
    ),
  ),
).stringify());

// => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
