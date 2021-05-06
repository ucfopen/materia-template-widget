var template = angular.module('player', []);

template.controller('PlayerController', ['$scope', function($scope) {
	var _qset = null;

	// callback needed for Materia.Engine.start
	// this will be called once Materia loads question data
	var startCallback = function(instance, qset) {
		// copy the instance title onto scope
		$scope.title = instance.name;

		// hold on to the qset
		_qset = qset;

		// show the first question
		$scope.question = _qset.items[0]

		// redraw
		$scope.$apply();
	};

	// answer checking function
	var checkAnswers = function(question, answer) {
		
		Materia.Score.submitQuestionForScoring(question.id, answer.text, answer.id)

		Materia.Engine.alert(answer.value == 100 ? "Correct!" : "Incorrect!", 'Score: ' + answer.value)
		$scope.displayFinish = true;
	};

	// tell materia we're done
	var submitFinalScore = function() {
		Materia.Engine.end()
	}

	// Expose Scope vars
	$scope.checkAnswers = checkAnswers
	$scope.submitFinal = submitFinalScore
	// question to display
	$scope.question = null;
	// radio button ng-model
	$scope.radioModel = { selected: 'current'}
	// display finish button
	$scope.displayFinish = false;
	// widget title
	$scope.title = "";

	// Tell Materia we're ready and pass the required callbacks
	// see https://ucfopen.github.io/Materia-Docs/develop/engine-core.html
	Materia.Engine.start({start: startCallback});
}]);
