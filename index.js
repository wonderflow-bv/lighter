/* eslint-env browser */

module.exports = function lighter ({ node, text } = {}) {
  if (!isNode(node)) {
    throw new TypeError('"node" is not a valid DOM Node')
  }

  if (typeof text !== 'string') {
    throw new TypeError('"text" is not a valid string')
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const match = ~node.nodeValue.toLowerCase().indexOf(text.toLowerCase())

    if (match) {
      const span = document.createElement('span')
      span.innerHTML = node.nodeValue.replace(new RegExp(`(${text})`, 'gi'), '<mark>$1</mark>')
      node.parentNode.replaceChild(span, node)
    }
  }

  if (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length > 0) {
    const childNodes = node.childNodes

    for (let i = 0, l = childNodes.length; i < l; i++) {
      lighter({ node: childNodes[i], text })
    }
  }
}

function isNode (o) {
  return (
    typeof Node === 'object' ? o instanceof Node
      : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
  )
}
