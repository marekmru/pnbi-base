# pnbi-base

> Base Routes and Components fro PNBI Webapps

## Project config

``` bash

import is from 'is'
const port = '5000'

const isApiBaseDefined = is.defined(window.BIAPIBASE) && !window.BIAPIBASE.includes('echo var')
const basePath = isApiBaseDefined ? window.BIAPIBASE : `http://localhost:${port}`

const BI_BASE_CONFIG = {
  API: basePath,
  MAIN_ROUTE: 'overview',
  TITLE: 'TITLE',
  IGNORED_ERRORS: [500]
}
export default BI_BASE_CONFIG

```
