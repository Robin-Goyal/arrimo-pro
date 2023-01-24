import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();
const config = {
  apiUrl: publicRuntimeConfig.apiUrl,
  mongoURI: publicRuntimeConfig.mongoURI,
}
export default config;