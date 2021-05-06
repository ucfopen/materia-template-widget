<?php
namespace Materia;

// Template Note: Change TemplateWidget with your widget name
class Score_Modules_TemplateWidget extends Score_Module
{
	// for any scored widget, the check_answer function MUST be implemented
	// this function (usually) matches the logged response to a question from the qset by referencing the question in the qset via $this->questions[$log->item_id]
	// it then (usually) compares the value of the provided answer to the value of the matched answer in the qset question
	// this process will vary from widget to widget; it's up to the widget developer how to log individual questions, and how those questions will be scored
	public function check_answer($log)
	{
		foreach ($this->questions[$log->item_id]->answers as $answer) {
			if ($log->value == $answer['id']) {
				trace("OK, RETURNING ".$answer['value']);
				return $answer['value'];
			}
		}
		return 0;
	}

	// do note that the base score module has additional methods that can be overriden to customize different aspects of the scoring process,
	// or to modify the scoreTable object that is provided to custom score screens.
}
