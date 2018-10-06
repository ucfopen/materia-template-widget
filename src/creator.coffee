###
This is the main controller for the Angular.js Creator interface
It contains sample callback functions required to create a Materia widget "Creator"
See https://ucfopen.github.io/Materia-Docs/develop/creator-core.html
###

creator = angular.module('creator', [])

# Note, this less verbose AngularJS module definition requires protection
# from minification in webpack using a library like ng-annotate-loader
# Note that player-controller.js is written in a way that doesn't require protection
creator.controller 'creatorCtrl', ($scope) ->
	materiaCallbacks = {}
	qset = ""

	# Callback when a new widget is being created
	materiaCallbacks.initNewWidget = (widget) =>
		console.log "new"
		$scope.$apply(() => $scope.widget.engineName = $scope.widget.title = widget.name)

	# Callback when editing an existing widget
	materiaCallbacks.initExistingWidget = (title, widget, qset, version, baseUrl) =>
		console.log "edit"
		$scope.state.isEditingExistingWidget = true

		$scope.$apply(() =>
			$scope.widget.engineName = widget.name
			return $scope.widget.title = title
		)

		return qset if qset.length

	# Callback when widget save is clicked
	materiaCallbacks.onSaveClicked = () =>
		console.log "save"
		if $scope.widget.title
			return Materia.CreatorCore.save $scope.widget.title, qset
		else
			return Materia.CreatorCore.cancelSave 'This widget has no title!'

	# NOT USED - Example callback for after save is complete
	# materiaCallbacks.onSaveComplete = (title, widget, qset, version) =>
	# 	console.log "complete"
	# 	return null

	# NOT USED - Example callback for after a media file is uploaded
	# materiaCallbacks.onMediaImportComplete = (media) =>
	# 	console.log "import"
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
