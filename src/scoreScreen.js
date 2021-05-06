import React from 'react';
import ReactDOM from 'react-dom';

let title = '';

const ScoreScreenApp = props => {
	return(
		<div>
			<div id="title">{props.title}</div>
			<div>Score Table</div>
			{ props.scoreTable.map((row, i) =>
				<div key={i}>
					<div>Question</div>
					<div>{row.data[0]}</div>
					<div>Score</div>
					<div>{row.score}{row.symbol}</div>
					<div>Correct Answer</div>
					<div>{row.data[1]}</div>
					<div>Given Answer</div>
					<div>{row.data[2]}</div>
				</div>
			)}
		</div>
	);
};

export default ScoreScreenApp;

const updateDisplay = (qset, scoreTable, title) => {
	console.log(scoreTable)
	ReactDOM.render(
		<ScoreScreenApp
			qset={qset}
			scoreTable={scoreTable}
			title={title}
		/>,
		document.getElementById('root')
	);
};

const materiaCallbacks = {
	start: (instance, qset, scoreTable, isPreview, qsetVersion) => {
		title = instance.name;
		updateDisplay(qset, scoreTable, title);
	},
	update: (qset, scoreTable) => {
		updateDisplay(qset, scoreTable, title);
	}
};

Materia.ScoreCore.start(materiaCallbacks);
Materia.ScoreCore.hideResultsTable();
