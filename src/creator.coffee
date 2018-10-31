###
This is the main controller for the Angular.js Creator interface
It contains sample callback functions required to create a Materia widget "Creator"
See https://ucfopen.github.io/Materia-Docs/develop/creator-core.html
###

creator = angular.module('creator', [])

# Note, this less verbose AngularJS module definition requires protection
# from minification in webpack using a library like ng-annotate-loader
# Note that player-controller.js is written in a way that doesn't require protection
creator.controller 'CreatorCtrl', ($scope) ->
	materiaCallbacks = {}
	_qset = ""

	# Callback when a new widget is being created
	materiaCallbacks.initNewWidget = (widget) =>
		console.log "new"
		$scope.$apply () =>
			$scope.widget.engineName = $scope.widget.title = widget.name

	# Callback when editing an existing widget
	materiaCallbacks.initExistingWidget = (title, widget, qset, version, baseUrl) =>
		console.log "edit"
		_qset = qset
		$scope.$apply () =>
			$scope.state.isEditingExistingWidget = true
			$scope.widget.engineName = $scope.widget.title = widget.name

	# Callback when widget save is clicked
	materiaCallbacks.onSaveClicked = () =>
		console.log "save"
		if $scope.widget.title
			Materia.CreatorCore.save $scope.widget.title, _qset
		else
			Materia.CreatorCore.cancelSave 'This widget has no title!'

	# Example callback for after save is complete
	materiaCallbacks.onSaveComplete = (title, widget, qset, version) =>
		console.log "save complete", arguments
		return null

	# NOT USED - Example callback for after import questions has been used
	# NOTE - the widget's install.yaml must have list
	# Multiple Choice or Question/Answer for import dialog to show
	materiaCallbacks.onQuestionImportComplete = (questions) =>
		console.log "import questions", questions
		return null

	# NOT USED - Example callback for after a media file is uploaded
	# materiaCallbacks.onMediaImportComplete = (media) =>
	# 	console.log "import media", media
	# 	return null

	# Set variables on scope
	$scope.widget =
		engineName: '',
		title: ''

	$scope.state =
		isEditingExistingWidget: false

	# tell materia we're ready and give it a
	# reference to our callbacks
	Materia.CreatorCore.start materiaCallbacks
