describe('PlayerController', function() {
	require('angular/angular.js');
	require('angular-mocks/angular-mocks.js');
	var $controller

	beforeEach(() => {
		jest.resetModules()
		angular.mock.module('player')
		global.Materia = {
			Engine: {
				start: jest.fn(),
				alert: jest.fn(),
				end: jest.fn()
			},
			Score: {
				submitFinalScoreFromClient: jest.fn()
			}
		}

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
			displayFinish: false,
			question: null,
			radioModel: {
				selected: 'current'
			},
			submitFinal: expect.any(Function),
			title: ''
		})
	});

	test('checkAnswers displays finish button', () => {
		var $scope = {}
		var controller = $controller('PlayerController', { $scope })
		expect($scope).toHaveProperty('displayFinish', false)
		$scope.checkAnswers({}, {value: 100})
		expect($scope).toHaveProperty('displayFinish', true)

		$scope.checkAnswers({}, {value: 99})
		expect($scope).toHaveProperty('displayFinish', true)

		$scope.checkAnswers({}, {value: 0})
		expect($scope).toHaveProperty('displayFinish', true)
	});

	test('checkAnswers calls alert', () => {
		var $scope = {}
		var controller = $controller('PlayerController', { $scope })
		expect(Materia.Engine.alert).not.toHaveBeenCalled()

		$scope.checkAnswers({}, {value: 100})
		expect(Materia.Engine.alert).toHaveBeenLastCalledWith('Correct!', 'Score: 100')

		$scope.checkAnswers({}, {value: 99})
		expect(Materia.Engine.alert).toHaveBeenLastCalledWith('Incorrect!', 'Score: 99')

		$scope.checkAnswers({}, {value: 0})
		expect(Materia.Engine.alert).toHaveBeenLastCalledWith('Incorrect!', 'Score: 0')
	});


	test('checkAnswers sends a score log', () => {
		var $scope = {}
		var controller = $controller('PlayerController', { $scope })
		expect(Materia.Score.submitFinalScoreFromClient).not.toHaveBeenCalled()

		$scope.checkAnswers({id: 'mock-question-id'}, {id: 'mock-answer-id', value: 100})
		expect(Materia.Score.submitFinalScoreFromClient).toHaveBeenLastCalledWith('mock-question-id', 'mock-answer-id', 100)

		$scope.checkAnswers({id: 'mock-question-id'}, {id: 'mock-answer-id', value: 99})
		expect(Materia.Score.submitFinalScoreFromClient).toHaveBeenLastCalledWith('mock-question-id', 'mock-answer-id', 99)

		$scope.checkAnswers({id: 'mock-question-id'}, {id: 'mock-answer-id', value: 0})
		expect(Materia.Score.submitFinalScoreFromClient).toHaveBeenLastCalledWith('mock-question-id', 'mock-answer-id', 0)
	});

	test('submitFinal calls end', () => {
		var $scope = {$apply: jest.fn()}
		var controller = $controller('PlayerController', { $scope })

		expect(Materia.Engine.end).not.toHaveBeenCalled()
		$scope.submitFinal()
		expect(Materia.Engine.end).toHaveBeenCalled()
	})

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
