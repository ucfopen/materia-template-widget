describe('template', function() {
	// grab the demo widget for easy reference
	var widgetInfo = window.__demo__['build/demo'];
	var qset = widgetInfo.qset;

	var $scope = {};
	var ctrl;

	describe('templateCtrl', function(){
		module.sharedInjector();
		beforeAll(module('template'));

		beforeAll(inject(function ($rootScope, $controller) {
			$scope = $rootScope.$new();
			ctrl = $controller('templateCtrl', { $scope: $scope });
		}));

		it('should fail because phantom\'s browser height is inaccessible by materia.enginecore, yet "start" needs to run."', function() {
			$('html').css('height', '200px');
			expect($scope.start(widgetInfo, qset.data)).toThrow();
		});

		it('should have a title of "Template Widget"', function() {
			expect($scope.title).toBe('Template Widget');
		});

		it('should have (show) results hidden at start of widget', function() {
			expect($scope.showAnswer).toBe(false);
		});

		it('should have initial finalScore of -1', function() {
			expect($scope.finalScore).toBe(-1);
			expect($scope.currentQuestion).toBe(-1);
			expect($scope.currentAnswer.index).toBe(-1);
		});

		it('should have results empty at start of widget', function() {
			expect($scope.result).toBe('');
		});

		it('should have (show) results equal true after answering a question', function() {
			$scope.questionAnswered(qset.data.items[0].question[0], 0);
			expect($scope.showAnswer).toBe(true);
		});

		it('should have "Incorrect!\nScore: " + 100" in result for wrong answer', function() {
			expect($scope.result).toBe("Incorrect!\nScore: " + 0);
		});

		it('should have "Correct!\nScore: " + 100" in result for right answer', function() {
			$scope.questionAnswered(qset.data.items[0].question[0], 3);
			expect($scope.result).toBe("Correct!\nScore: " + 100);
		});
	});
	
});

describe('materiaCreator', function(){
	beforeEach(module('materiaCreator'));

	var $scope = {};
	var ctrl;

	beforeEach(inject(function($rootScope){
		$scope = $rootScope.$new();
	}));

	describe('creatorCtrl', function() {

		beforeEach(inject(function ($controller) {
			ctrl = $controller('creatorCtrl', { $scope: $scope });
		}));

		// override the method that runs if the widget is saved properly
		Materia.CreatorCore.save = function(title, qset, version) {
			return true;
		};
		// override the method that runs if the widget is saved without a title
		Materia.CreatorCore.cancelSave = function(msg) {
			return msg;
		};

		it('should make a new widget', function(){
			$scope.initNewWidget({name: 'template-widget'});

			expect($scope.widget.engineName).toBe('template-widget');
			expect($scope.widget.title).toBe('template-widget');
		});

		it('should cause an issue when saved without a title', function(){
			expect($scope.onSaveClicked()).toBe('This widget has no title!');
		});

		it('should save properly when it has a title', function(){
			$scope.widget.title = 'template-widget';
			expect($scope.onSaveClicked()).toBe(true);
		});

		it('should edit an existing widget', function(){
			$scope.initExistingWidget('Template Widget', {name: 'template-widget'}, {});
			expect($scope.initExistingWidget).toBeDefined();
		});
	});
});