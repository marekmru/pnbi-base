const port = '5001/core4/api/v1'
const isApiBaseDefined = (window.BIAPIBASE != null) && !window.BIAPIBASE.includes('echo var')
const basePath = isApiBaseDefined ? window.BIAPIBASE : `http://localhost:${port}`
const config = {
  API: basePath,
  MAIN_ROUTE: 'start',
  TITLE: 'CORE 4 Tester',
  IGNORED_ERRORS: []
}
export default config
