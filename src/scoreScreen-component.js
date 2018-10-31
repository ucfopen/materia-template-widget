import React from 'react';

const ScoreScreen = (props) =>
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

export default ScoreScreen
