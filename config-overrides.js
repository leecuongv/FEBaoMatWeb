const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': "'none'",
    'object-src': "'none'",
    'base-uri': "'self'",
    'connect-src': "'self' https://bebaomatweb.herokuapp.com",
    'worker-src': "'self'",
    'img-src': "*",
    'font-src': "'self' https://cdnjs.cloudflare.com/",
    'frame-src': "'self'",
    'manifest-src': "'self'",
    'style-src':"'self' 'unsafe-inline' https://cdnjs.cloudflare.com"
};

function addCspHtmlWebpackPlugin(config) {
    if(process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost)
            config.headers = {
                'X-Frame-Options': 'deny',
                'X-Content-Type-Options':'nosniff'
            }
            return config
        }
    }
};