import React from 'react';
import ScoreScreen from './scoreScreen-component';
import renderer from 'react-test-renderer';

describe('ScoreScreen component', function() {

	beforeEach(() => {
		jest.resetModules()
	})

	test('ScoreScreen renders empty table', () => {
		const props = {
			title: 'mock-title',
			scoreTable: []
		}

		const component = renderer.create(<ScoreScreen {... props}/>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

	});

	test('ScoreScreen renders title and table', () => {
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

		const component = renderer.create(<ScoreScreen {... props}/>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

	});

})
