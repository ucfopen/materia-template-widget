// BEST PRACTICES FOR PACKAGING WIDGETS
// 1. JS & CSS: concatinate into one file: all css into player.css, all js into player.js
// 2. Use CDN's for vendor libraries (see cdnjs)
// 3. Avoid use of libraries when plain js will do (like jquery)
// 4. When using ANGULAR.js, use ng-annotate-loader to protect dependency injection from minification
// 5.".js" files are NOT altered by default. To use babel customize webpack module rules for js files

const path = require('path')
const fs = require('fs')
const srcPath = path.join(__dirname, 'src')
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')


// see Webpack.entry
let entries = widgetWebpack.getDefaultEntries()

// ANGULAR.JS & COFFEESCRIPT
// creator.js uses the default configuration - no need to override!
// entries['creator.js'] = [
// 	path.join(srcPath, 'creator.coffee')
// ]

// ANGULAR.JS & PLAIN JS
// We are using 2 js files we'd like to concatinate
// which requires a custom entry to overwrite the default
// default expects
entries['player.js'] = [
	path.join(srcPath, 'player-module.js'),
	path.join(srcPath, 'player-controller.js')
]

// add a file to the list of files copied to the compiled widget
let copy = widgetWebpack.getDefaultCopyList()
copy.concat([path.join(srcPath, 'extrafile.jpg')])


// replace coffee loader with one that protects angular.js
let rules = widgetWebpack.getDefaultRules()
let newRules = [
	rules.loaderDoNothingToJs,
	// next rule replaces "rules.loaderCompileCoffee"
	{
		test: /\.coffee$/i,
		exclude: /node_modules/,
		loader: require('extract-text-webpack-plugin').extract({
			use: ['raw-loader', 'ng-annotate-loader', 'coffee-loader']
		})
	},
	rules.copyImages,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.loadAndPrefixCSS,
	rules.loadAndPrefixSASS
]

// options for the webpack build
// see https://github.com/ucfopen/Materia-Widget-Dev-Kit/blob/master/webpack-widget.js
let options = {
	entries: entries,
	moduleRules: newRules,
	// copyList: copy
}

// load the default legacy webpack config
module.exports = widgetWebpack.getLegacyWidgetBuildConfig(options)
