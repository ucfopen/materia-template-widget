import React from 'react';
import ReactDOM from 'react-dom';
import ScoreScreen from './scoreScreen-component';

const defaultParams = {
	title: '',
	scoreTable: []
}

let currentState = Object.assign({}, defaultParams)

const updateDisplay = (qset, scoreTable, title) => {
	let newState = {
		title:title,
		scoreTable: scoreTable[0].details[0].table
	}

	currentState = Object.assign({}, currentState, newState)

	ReactDOM.render(
		<ScoreScreen {...currentState} />,
		document.getElementById('root')
	)
}

const materiaCallbacks = {
	start: (instance, qset, scoreTable, isPreview, qsetVersion) => {
		updateDisplay(qset, scoreTable, instance.name)
	},
	update: (qset, scoreTable) => {
		updateDisplay(qset, scoreTable, currentState.title)
	}
}

Materia.ScoreCore.start(materiaCallbacks)
