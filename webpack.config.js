const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// load the reusable legacy webpack config from materia-widget-dev
let webpackConfig = require('materia-widget-development-kit/webpack-widget').getLegacyWidgetBuildConfig()

// cusomize the config
delete webpackConfig.entry['creator.js']
delete webpackConfig.entry['player.js']

webpackConfig.entry['modules/creator.js'] = [path.join(__dirname, 'src', 'modules', 'creator.js')]
webpackConfig.entry['modules/player.js'] = [path.join(__dirname, 'src', 'modules', 'player.js')]

webpackConfig.entry['controllers/creator.js'] = [path.join(__dirname, 'src', 'controllers', 'creator.js')]
webpackConfig.entry['controllers/player.js'] = [path.join(__dirname, 'src', 'controllers', 'player.js')]

module.exports = webpackConfig
