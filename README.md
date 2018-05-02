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

Please make sure your host app hase dependencies installed

1. "vuetify": "^1.0.0"
2. "vue-router": "^3.0.1",
3. "vee-validate": "2.0.4", 
4. "pnbi-base": "https://github.com/marekmru/pnbi-base.git#candidate", 
5. "vue": "^2.5.2",
6. "axios": "^0.17.1"
7. "is": "^3.2.1"

Dev
8. "node-sass": "^4.7.2"
