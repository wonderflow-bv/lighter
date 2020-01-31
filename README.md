![Example](/images/lighter-logo.png)

Highlight words in a HTML page with ease.

![Example](/images/examples.png)

## Install

```bash
$ npm install @wonderflow/lighter
```

## `lighter({ node, text })`

The `lighter` function accepts two arguments:

- `node` (required): a DOM node reference
- `text` (required): the text you need to highlight

```js
const lighter = require('@wonderflow/lighter')

lighter({ node: document.querySelector('.test'), text: 'dolor' })
```

## Bundling

On local examples we're using [browserify](http://browserify.org/) to build the `bundle.js` file, but you can use any existing bundler with ease like [Webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/).

## Examples

If you run:

```bash
$ npm run examples
```

An [http-server](https://www.npmjs.com/package/http-server) instance will boot locally with some examples (look at source code)

## Author

[Wonderflow](https://www.wonderflow.co)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
