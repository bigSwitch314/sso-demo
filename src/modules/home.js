import request from '../utils/request'

export default {
  namespace: 'home',
  initState: {
    homeMenuList: {},
    headConf: {},
  },
  reducer: {
    getArticleList(state, { payload }) {
      return ({ ...state, homeMenuList: payload })
    },
    getHeadConf(state, { payload }) {
      return ({ ...state, headConf: payload })
    },
  },
}

const n = (name) => `home/${name}`

export const getHomeMenuList = (params) => request.get('/api/infra-uuv/v0.1/users/privilege/menus', n('getHomeMenuList'), params)
export const getHeadConf = (params) => request.get('/api/infra-config/v0.1/config/head', n('getHeadConf'), params)

