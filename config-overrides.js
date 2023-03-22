const path = require('path')
const { override, addDecoratorsLegacy, overrideDevServer, addLessLoader, watchAll, adjustStyleLoaders, } = require('customize-cra')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
    config.resolve.alias['@'] = resolve('src')
    if (env === 'production') {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }
    return config
};


module.exports = {
    webpack: override(addDecoratorsLegacy(), customize()),
    devServer: overrideDevServer((config) => {
        return {
            ...config,
            proxy: {
                "/path1": {
                    target: process.env.REACT_APP_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/path1/, ''),
                }
            },
        }
    },watchAll()),
}
