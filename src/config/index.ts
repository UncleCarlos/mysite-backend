import DefaultConfig from './config.default'
import DevConfig from './config.dev'
import ProdConfig from './config.prod'

const config: { API_BASE_URL?: string; API_TIMEOUT?: number } = import.meta.env.PROD
  ? Object.assign(DefaultConfig, ProdConfig)
  : Object.assign(DefaultConfig, DevConfig)

export default config
