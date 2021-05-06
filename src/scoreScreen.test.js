import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'

const mockDomRender = jest.fn()

// jest.mock('react-dom', () => ({ReactDom: {render: mockDomRender}}), {virtual: true})
// jest.mock('./react-render', () => mockDomRender, {virtual: true})

describe('ScoreScreen', function() {
	beforeEach(() => {
		jest.resetAllMocks()
		jest.resetModules()
		jest.unmock('react-dom')
		global.Materia = {
			ScoreCore: {
				start: jest.fn(),
				update: jest.fn(),
				hideResultsTable: jest.fn()
			}
		}
	});

	test('ScoreScreen registers callbacks', () => {
		require('./scoreScreen')
		jest.mock('react-dom', () => {
			jest.fn();
		})
		expect(Materia.ScoreCore.start).toHaveBeenCalledTimes(1)
		const callbacks = Materia.ScoreCore.start.mock.calls[0][0]
		expect(callbacks).toHaveProperty('start', expect.any(Function))
		expect(callbacks).toHaveProperty('update', expect.any(Function))
	});

	test('start renders as expected', () => {
		require('./scoreScreen')
		jest.mock('react-dom', () => ({
			render: mockDomRender
		}))

		const start = Materia.ScoreCore.start.mock.calls[0][0].start

		const scoreTable = [
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

		expect(mockDomRender).toHaveBeenCalledTimes(0)
		start({name: 'mock-name'}, {}, scoreTable, false, 1)
		expect(mockDomRender).toHaveBeenCalledTimes(1)
		expect(mockDomRender.mock.calls[0][0]).toMatchSnapshot()
	});

	test('update renders as expected', () => {
		require('./scoreScreen')
		jest.mock('react-dom', () => ({
			render: mockDomRender
		}))

		const update = Materia.ScoreCore.start.mock.calls[0][0].update

		const scoreTable = [
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

		expect(mockDomRender).toHaveBeenCalledTimes(0)
		update({}, scoreTable)
		expect(mockDomRender).toHaveBeenCalledTimes(1)
		expect(mockDomRender.mock.calls[0][0]).toMatchSnapshot()
	});

	test('ScoreScreen renders empty table', () => {
		const ScoreScreenApp = require('./scoreScreen').default
		const props = {
			title: 'mock-title',
			scoreTable: []
		}

		const component = renderer.create(<ScoreScreenApp {... props}/>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('ScoreScreen renders title and table', () => {
		const ScoreScreenApp = require('./scoreScreen').default
		const props = {
			title: 'mock-title',
			scoreTable: [
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

		const component = renderer.create(<ScoreScreenApp {... props}/>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
})
