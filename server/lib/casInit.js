const ConnectCas = require('connect-cas2')


const ignore = [
  /.(js|css|png|jpg|ico|jpeg|bmp|ttf|eot)$/,
  /^data:image/,
  '/logout',
  function (path, req){
    return req.headers.needignore
  },
]

const casConfig = {
  debug: true,
  servicePrefix: 'http://192.168.120.183:3000',
  serverPath: 'http://192.168.108.47',
  paths: {
    validate: '/cas/validate',
    serviceValidate: '/sso/serviceValidate',
    proxy: '',
    login: '/sso/login',
    logout: '/sso/logout',
    proxyCallback: '',
    pgtUrl: '',
  },
  ignore,
  match: [],
  redirect: false,
  gateway: false,
  renew: false,
  slo: true,
  cache: {
    enable: true,
    ttl: 5 * 60 * 1000,
    filter: [],
  },
  fromAjax: {
    header: 'x-client-ajax',
    status: 418,
  },
}

function initCasClient(app) {
  const casClient = new ConnectCas(casConfig)

  // 保存cas相关方法
  const core = casClient.core()
  const logout = casClient.logout()

  app.use((req, res, next) => {
    console.log('req.url----', req.url)
    core(req, res, next)
  })

  // 应用登录退出调用接口
  app.get('/logout', (req, res, next) => {
    logout(req, res, next)
  })
}

module.exports = initCasClient
