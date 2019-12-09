(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const lighter = require('..')

lighter({ node: document.querySelector('.test'), text: 'dolor' })
lighter({ node: document.querySelector('.test-2'), text: 'Redis' })
lighter({ node: document.querySelector('.container-with-nested-elements'), text: 'stuff' })

},{"..":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
