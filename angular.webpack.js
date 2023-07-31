/* eslint-env es6 */
/* eslint-disable */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

/**
 * Custom angular webpack configuration
 */
module.exports = (config, options) => {
    config.target = 'electron-renderer';

    if (options.fileReplacements) {
        for (let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }

    config.plugins = [
        ...config.plugins,
        new NodePolyfillPlugin({
            excludeAliases: ["console"]
        })
    ];
    config.output.globalObject = 'globalThis';

    return config;
}
