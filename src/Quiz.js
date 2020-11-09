import React, { Component } from "react";
import { ScrollView } from 'react-native';
import Registration from "./Registration";
import QuestionCode from "./QuestionCode";
import Questions from "./Questions";

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.handleRegistrationUpdate = this.handleRegistrationUpdate.bind(this);
		this.handleQuestionCodeUpdate = this.handleQuestionCodeUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.state = {
			showRegistration: true,
			showQuestionCode: false,
			showQuestions: false,
			showEnd: false,
			nickname: "",
			sessionid: "",
			questionCode: "",
			questions: []
		};
	}

	handleRegistrationUpdate({nickname, sessionid}) {
		this.setState({
			...this.state,
			nickname,
			sessionid,
			showQuestionCode: true
		})
	}

	handleQuestionCodeUpdate(questionCode) {
		this.setState({
			...this.state,
			questionCode,
			showQuestions: true
		})
	}

	handleQuestionSubmit() {
		this.setState({
			...this.state,
			showRegistration: false,
			showQuestionCode: false,
			showQuestions: false,
			showEnd: true,
			questionCode: null,
			questions: []
		});
	}

	handleNext() {
		this.setState({
			...this.state,
			showRegistration: false,
			showQuestionCode: true,
			showQuestions: false,
			showEnd: false,
			questionCode: null,
			questions: []
		});
	}

	render() {
		return(

		<ScrollView>
			{  this.state.showRegistration &&
				<div>
					<Registration handleRegistrationUpdate={this.handleRegistrationUpdate}/>
				</div>
			}
			{
				this.state.showQuestionCode && 
				<div>
					<QuestionCode handleQuestionCodeUpdate={this.handleQuestionCodeUpdate}/>
				</div>
			}
			
			{ this.state.showQuestions && 
				<div>
				<Questions 
						sessionid={this.state.sessionid}
						questionCode={this.state.questionCode} 
						handleQuestionSubmit={this.handleQuestionSubmit}/>
				</div>
			}

			{  this.state.showEnd &&
				<div>
					<button onClick={this.handleNext}>Next</button>
				</div>
			}
			
		</ScrollView>
		);
	}
}

export default Quiz;