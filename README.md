# Template Widget

This widget serves as a starting point to copy and paste from when making a widget 'from scratch.'

This widget shows how to build and test several different builds.  Normally you'd build your entire widget with one consistent framework, but this one contains multiple types as an example of how to bend the webpack build to your will.

* Angular and plain Javascript: Widget Player
* Angular and Coffeescript: Widget Creator
* React and ES6: Score Screen

The webpack.config.js file contains a lot of documentation to help you understand how to work with the MWDK and our webpack configuration that helps build and package widgets.


It's complete with unit tests, not all of which are required. A few superfluous functions and subsequent tests were added to show minimal functionality. The internal comments direct to which areas are expendable, and which are essential.


> NOTE: If you are cloning this widget, to make a new widget, then make sure to redirect your remote git repo to the new widget repo.


## Testing

## Testing Coffeescript with Jest

Add `jest-coffee-preprocessor` and add properties to package.json to define `jest.transform` and `jest.moduleFileExtensions`.  They must be customized to load and transform coffeescript.

## Testing Angular.js

You'll need angular mock, and you'll have to use the inject function to get a reference to modules and dependencies

## Testing React, JSX, ES6

