if(!process.env.NODE_ENV) {
  require('dotenv').config()
}

export const IS_LOCAL = process.env.NODE_ENV === 'local'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export default process.env
