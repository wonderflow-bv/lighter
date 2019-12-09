const test = require('ava')
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const lighter = require('..')

const DOM = (new JSDOM(fs.readFileSync(path.join(__dirname, './fixtures/redis.html'), 'utf-8')))

global.document = DOM.window.document
global.Node = DOM.window.Node

test('throws if an invalid node is passed', t => {
  const err = t.throws(() => lighter({ node: 'invalid node', text: 'small' }))

  t.is(err.message, '"node" is not a valid DOM Node')
})

test('throws if an invalid text is passed', t => {
  const div = document.createElement('div')

  const err = t.throws(() => lighter({ node: div, text: {} }))

  t.is(err.message, '"text" is not a valid string')
})

test('highlight "small" word wrapping it with <mark> element', t => {
  const div = document.createElement('div')
  div.innerHTML = 'This module should be very small'
  document.body.appendChild(div)

  lighter({ node: div, text: 'small' })

  t.is(div.innerHTML, '<span>This module should be very <mark>small</mark></span>')
})

test('highlight "small" in nested elements', t => {
  const div = document.createElement('div')
  div.innerHTML = '<ul><li><div><p>This module should be very small</p></div></li></ul>'
  document.body.appendChild(div)

  lighter({ node: div, text: 'small' })

  t.is(div.innerHTML, '<ul><li><div><p><span>This module should be very <mark>small</mark></span></p></div></li></ul>')
})

test('highlight "Redis" word in page specified selector', t => {
  const node = document.querySelector('div.title')

  lighter({ node, text: 'redis' })

  const highlights = node.querySelectorAll('mark')

  t.is(highlights.length, 4)
  t.true(Array.from(highlights).every(h => h.innerHTML === 'Redis'))
})
