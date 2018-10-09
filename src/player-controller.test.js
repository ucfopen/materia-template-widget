describe('PlayerController', function() {
	require('angular/angular.js');
	require('angular-mocks/angular-mocks.js');
	var $controller

	beforeEach(() => {
		jest.resetModules()
		angular.mock.module('player')
		global.Materia = {Engine: {start: jest.fn()}}

		require('./player-module');
		require('./player-controller');

		// use angular mock to access angular modules
		inject(function(_$controller_) {
			$controller = _$controller_
		});
	})

	test('PlayerController calls Engine start', () => {
		var $scope = {}
		var controller = $controller('PlayerController', { $scope })
		expect(global.Materia.Engine.start).toHaveBeenCalledTimes(1)
	});

	test('PlayerController sets expected scope params', () => {
		var $scope = {}
		var controller = $controller('PlayerController', { $scope })
		expect($scope).toEqual({
			checkAnswers: expect.any(Function),
			question: null,
			radioModel: {
				selected: 'current'
			},
			result: '',
			title: ''
		})
	});

	test('checkAnswers updates result', () => {
		var $scope = {}
		var controller = $controller('PlayerController', { $scope })
		expect($scope).toHaveProperty('result', "")
		$scope.checkAnswers({}, {value: 100})
		expect($scope.result).toBe("Correct!\n Score:100")

		$scope.checkAnswers({}, {value: 99})
		expect($scope.result).toBe("Incorrect!\n Score:99")

		$scope.checkAnswers({}, {value: 0})
		expect($scope.result).toBe("Incorrect!\n Score:0")
	});

	test('startCallback populates data and calls $apply', () => {
		var $scope = {$apply: jest.fn()}
		var controller = $controller('PlayerController', { $scope })

		// get a reference to startCallback
		let callback = global.Materia.Engine.start.mock.calls[0][0].start

		// test scope props before running start callback
		expect($scope).toHaveProperty('question', null)
		expect($scope).toHaveProperty('title', '')

		// set up mock objects
		let instance = {name: 'mock-instance-name'}
		let mockQuestion = { id: 'mock-question-object'}
		let qset = {
			questions: [mockQuestion]
		}

		// execute callback
		callback(instance, qset)

		expect($scope).toHaveProperty('question', mockQuestion)
		expect($scope).toHaveProperty('title', 'mock-instance-name')
		expect($scope.$apply).toHaveBeenCalledTimes(1)
	})
})
