/*
** Template Note: Change template and templateCtrl with your widget name, and
** widget name Ctrl, respectively. $scope.title = 'Template' should have your
** widget name as well.
**
** $scope.start is the only truly necessary function, used by most, if not all
** currently existing widget players.
**
** $scope.questionAnswered is function made specifically for this template as an example.
** Replace with your widget's specific functions. Make sure to remove unit tests that
** make reference to this function.
**
** The reference to 'return Materia.Engine.start($scope)' at the end is how the browser,
** and your unit tests have access to the player's variables and functions. Typically, this
** is something you'll need to keep.
*/
var template = angular.module('player', []);

template.controller('PlayerController', ['$scope', function($scope) {
	var _qset = null;
	var materiaCallbacks = {}
	var parsedQuestions = {}

	materiaCallbacks.start = function(instance, qset) {
		$scope.title = instance.name;
		$scope.showAnswer = false;
		_qset = qset;
		var ref = _qset.questions;
		var question;
		for (var i = 0; i < ref.length; i++) {
			question = ref[i];
			parsedQuestions[question.id] = {};
			parsedQuestions[question.id].question = question.question[0];
			parsedQuestions[question.id].answers = [];
			for(var j = 0; j < question.answers.length; j++) {
				parsedQuestions[question.id].answers[j] = question.answers[j];
			}

			$scope.question = question
		}

		Materia.Engine.setHeight();
		$scope.$apply();
	};

	$scope.questionAnswered = function(question, answer) {
		console.log("Answer chosen", answer)
		$scope.result = (answer.value == 100 ? "Correct!" : "Incorrect!") + "\n Score:" + answer.value
		$scope.showAnswer = true;
		$scope.question = null;
	};

	$scope.question = null;
	$scope.chosenAnswerIndex = -1;
	$scope.showAnswer = null;
	$scope.result = "";
	$scope.title = 'Template';

	Materia.Engine.start(materiaCallbacks);
}]);
