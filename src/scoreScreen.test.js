import React from 'react';
import renderer from 'react-test-renderer';

const mockDomRender = jest.fn()
jest.mock('react-dom', () => ({
     render: mockDomRender,
}));

// jest.mock('react-dom', () => ({ReactDom: {render: mockDomRender}}), {virtual: true})
// jest.mock('./react-render', () => mockDomRender, {virtual: true})

const mockScoreScreen = jest.fn()
jest.mock('./scoreScreen-component', () => mockScoreScreen, {virtual: true})

describe('ScoreScreen', function() {

	beforeEach(() => {
		jest.resetAllMocks()
		jest.resetModules()
		global.Materia = {
			ScoreCore: {
				start: jest.fn()
			}
		}
	})

	test('ScoreScreen regesters callbacks', () => {


		require('./scoreScreen')
		expect(Materia.ScoreCore.start).toHaveBeenCalledTimes(1)
		const callbacks = Materia.ScoreCore.start.mock.calls.pop()[0]
		expect(callbacks).toHaveProperty('start', expect.any(Function))
		expect(callbacks).toHaveProperty('update', expect.any(Function))
	});

	test('start renders as expected', () => {
		require('./scoreScreen')
		const start = Materia.ScoreCore.start.mock.calls.pop()[0].start

		const scoreTable = [
			{
				details: [
					{
						table: [
							{
								data: [
									"Mock Question 1",
									"Mock Correct Answer 1",
									"Mock Given Answer 1"
								],
								score: 100,
								symbol: "%"
							},
							{
								data: [
									"Mock Question 2",
									"Mock Correct Answer 2",
									"Mock Given Answer 2"
								],
								score: 0,
								symbol: " points"
							}
						]
					}
				]
			}
		]

		expect(mockDomRender).toHaveBeenCalledTimes(0)
		start({name: 'mock-name'}, {}, scoreTable, false, 1)
		expect(mockDomRender).toHaveBeenCalledTimes(1)
		expect(mockDomRender.mock.calls[0][0]).toMatchSnapshot()
	});

	test('update renders as expected', () => {
		require('./scoreScreen')
		const update = Materia.ScoreCore.start.mock.calls.pop()[0].update

		const scoreTable = [
			{
				details: [
					{
						table: [
							{
								data: [
									"Mock Question 1",
									"Mock Correct Answer 1",
									"Mock Given Answer 1"
								],
								score: 100,
								symbol: "%"
							},
							{
								data: [
									"Mock Question 2",
									"Mock Correct Answer 2",
									"Mock Given Answer 2"
								],
								score: 0,
								symbol: " points"
							}
						]
					}
				]
			}
		]

		expect(mockDomRender).toHaveBeenCalledTimes(0)
		update({}, scoreTable)
		expect(mockDomRender).toHaveBeenCalledTimes(1)
		expect(mockDomRender.mock.calls[0][0]).toMatchSnapshot()
	});

})
