var MateriaCreator = angular.module('materiaCreator', []);

MateriaCreator.controller('creatorCtrl', ['$scope', '$http', function($scope, $http) {
	var qset = "";
	$scope.widget =
	{
		engineName: '',
		title: ''
	};
	$scope.state =
	{
		isEditingExistingWidget: false
	};
	$scope.initNewWidget = function(widget) {
		console.log("new");
		$scope.$apply(function() {
			return $scope.widget.engineName = $scope.widget.title = widget.name;
		});
		return $http.get('assets/questions.json').then(function(success) {
			return qset = success.data.qset.data;
		}, function(fail) {
			return console.log("Could not load preset questions!");
		});
	};
	$scope.initExistingWidget = function(title, widget, qset, version, baseUrl) {
		console.log("edit");
		$scope.state.isEditingExistingWidget = true;
		$scope.$apply(function() {
			$scope.widget.engineName = widget.name;
			return $scope.widget.title = title;
		});
		if (!qset.length) {
			return $http.get('assets/questions.json').then(function(success) {
				return qset = success.data.qset.data;
			}, function(fail) {
				return console.log("Could not load preset questions!");
			});
		}
	};
	$scope.onSaveClicked = function() {
		console.log("save");
		if($scope.widget.title) {
			return Materia.CreatorCore.save($scope.widget.title, qset);
		} else {
			return Materia.CreatorCore.cancelSave('This widget has no title!');
		}
	};
	$scope.onSaveComplete = function(title, widget, qset, version) {
		console.log("complete");
		return null;
	};
	$scope.onMediaImportComplete = function(media) {
		console.log("import");
		return null;
	};
	var _buildSaveData = function() {
		return {
			name: '',
			items: []
		};
	};
	return Materia.CreatorCore.start($scope);
}]);