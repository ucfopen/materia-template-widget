/*
Template Webpack configuration
This config has various options for using the
legacy webpack template to build your widget with
tons of options for customizing

To really understand what's going on, you'll need to look at the source
of the Materia Widget Development Kit:
See https://github.com/ucfopen/Materia-Widget-Dev-Kit/blob/master/webpack-widget.js

BEST PRACTICES FOR PACKAGING WIDGETS
1. JS & CSS: concatenate into one file: all css into player.css, all js into player.js
2. Use CDN's for vendor libraries (see cdnjs)
3. Avoid use of libraries when plain js will do (like jquery)
4. When using ANGULAR.js, use ng-annotate-loader to protect dependency injection from minification
5.".js" files are NOT altered by default. To use babel customize webpack module rules for js files

*/
const path = require('path')
const fs = require('fs')
const srcPath = path.join(__dirname, 'src') + path.sep
const outputPath = path.join(__dirname, 'build')
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')

const rules = widgetWebpack.getDefaultRules()
const entries = widgetWebpack.getDefaultEntries()
const copy = widgetWebpack.getDefaultCopyList()


entries['guides/player.temp.html'] = [
	path.join(__dirname, 'src', '_guides', 'player.md')
]

entries['guides/creator.temp.html'] = [
	path.join(__dirname, 'src', '_guides', 'creator.md')
]

const customCopy = copy.concat([
	{
		from: path.join(__dirname, 'src', '_guides', 'assets'),
		to: path.join(outputPath, 'guides', 'assets'),
		toType: 'dir'
	},
])

let options = {
	entries: entries,
	copyList: customCopy
}

const ourFinalWebpackConfig = widgetWebpack.getLegacyWidgetBuildConfig(options)

module.exports = ourFinalWebpackConfig
