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

/*
======= WIDGET CREATOR ======
Normally getLegacyWidgetBuildConfig expects:
* src/creator.coffee
* src/creator.html
* src/creator.scss

==== DIFFERENT IN THIS EXAMPLE ====
We're using coffeescript, but in our case it's angular
and we're relying on a loader to protect shorthand
dependency injection syntax

==== CHANGES NEEDED ====
1. Replace coffeescript loader
*/

const customCoffeeLoader = {
	test: /\.coffee$/i,
	exclude: /node_modules/,
	loader: require('extract-text-webpack-plugin').extract({
		use: ['raw-loader', 'ng-annotate-loader', 'coffee-loader']
	})
}




/*
======= WIDGET PLAYER ======
Normally getLegacyWidgetBuildConfig expects:
* src/player.coffee
* src/player.html
* src/player.scss

==== DIFFERENT IN THIS EXAMPLE ====
We're NOT using coffeescript, instead we're just
concatenating 2 plain javascript files.

==== CHANGES NEEDED ====
1. Overwrite entries for player.js
2. Alter the default to target just our player files

NOTE: #2 is only needed because we don't want a generic *.js rule to apply to scoreScreen
*/

// #1. combine 2 plain js files into player.js
entries['player.js'] = [
	`${srcPath}player-module.js`,
	`${srcPath}player-controller.js`
]

// #2. Redefine ".test" on loaderDoNothingToJs for just our player files
// Only needed because we don't want a generic *.js rule to apply
// to the ScoreScreen
const customDoNothingToJs = rules.loaderDoNothingToJs
customDoNothingToJs.test = /player-.*\.js$/i





/*
======= SCORE SCREEN ======
getLegacyWidgetBuildConfig doesn't have rules for scoreScreen.


==== DIFFERENT IN THIS EXAMPLE ====
We'll be using React, JSX, Babel, and PLAIN CSS

We'll add entries for the html, a plain css file and a React

==== CHANGES NEEDED ====
1. Add an entry for ScoreScreen.js
2. Add an entry for ScoreScreen.css and html
3. Add a module loader for react and babel*
4. Add an externals config to prevent react
   and react-dom from being compiled (at bottom of file)

NOTE, #3 will be loading .js files - make sure this rule
doesn't conflict with other loaders if you're not using
react for all parts of the widget.  In this example, you
can see how we changed the loaderDoNothingToJss
to more specifically target the desired files, and
not affect the rules for react.

*/

// #1 React and ES6 via Babel
entries['scoreScreen.js'] = [
	`${srcPath}scoreScreen.js`,
]

// #2 CSS & HTML
entries['scoreScreen.css'] = [
	`${srcPath}scoreScreen.html`,
	`${srcPath}scoreScreen.css`
]

// #3 Custom module loader for react
const customReactLoader = {
	test: /scoreScreen.*\.js$/i,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader'
	}
}





/*
======= EXTRA FILES ======
To add any extra files that aren't in src/assets, they
need to be added to the copyList


==== DIFFERENT IN THIS EXAMPLE ====
We need extrafile.txt in the "root" directory

==== CHANGES NEEDED ====
1. Append a new file onto the copyList

*/

const customCopy = copy.concat([{
	from: `${srcPath}extrafile.txt`,
	to: outputPath
}])





/*
======= USE CUSTOM RULES TO BUILD A WEBPACK CONFIG ======
Now we'll send our customizations into getLegacyWidgetBuildConfig
to build a webpack config.

==== CHANGES NEEDED ====
1. Build an array of custom module loader rules
2. Build options object for getLegacyWidgetBuildConfig
3. Add externals for React (used on our score screen)

*/
let customRules = [
	customDoNothingToJs, // <--- replaces "rules.loaderDoNothingToJs"
	customCoffeeLoader, // <--- replaces "rules.loaderCompileCoffee"
	rules.copyImages,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.loadAndPrefixCSS,
	rules.loadAndPrefixSASS,
	customReactLoader, // <--- Extra new rule for react
]

// options for the build
let options = {
	entries: entries,
	moduleRules: customRules,
	copyList: customCopy
}

const ourFinalWebpackConfig = widgetWebpack.getLegacyWidgetBuildConfig(options)

// Score Screen #4 (from further up in this file)
// after building, modify externals to make sure
// React and React-Dom are not compiled
// into our source code for the Score Screen
ourFinalWebpackConfig.externals = {
	"react": "React",
	"react-dom": "ReactDOM"
}

module.exports = ourFinalWebpackConfig
