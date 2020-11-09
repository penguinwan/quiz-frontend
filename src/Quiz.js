import React, { Component } from "react";
import { ScrollView } from 'react-native';
import Registration from "./Registration";
import QuestionCode from "./QuestionCode";
import Questions from "./Questions";

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
		this.handleRegistrationUpdate = this.handleRegistrationUpdate.bind(this);
		this.handleQuestionCodeUpdate = this.handleQuestionCodeUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
		this.handleAgain = this.handleAgain.bind(this);
		this.state = {
			showRegistration: true,
			showQuestionCode: false,
			showQuestions: false,
			showEnd: false,
			nickname: "",
			sessionid: "",
			questionCode: "",
			questions: [],
			answers: []
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

	handleQuestionUpdate(answer) {
		let res = [];
		if(this.state.answers.find(obj => obj.id === answer.id)) {
			res = this.state.answers.map(obj => obj.id !== answer.id ? obj : answer);
		} else {
			res = [...this.state.answers, answer];
		}

		this.setState({
			...this.state,
			answers: res
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
			questions: [],
			answers: []
		});
	}

	handleAgain() {
		this.setState({
			...this.state,
			showRegistration: false,
			showQuestionCode: true,
			showQuestions: false,
			showEnd: false,
			questionCode: null,
			questions: [],
			answers: []
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
						questionCode={this.state.questionCode} 
						handleQuestionUpdate={this.handleQuestionUpdate}
						handleQuestionSubmit={this.handleQuestionSubmit}/>
				</div>
			}

			{  this.state.showEnd &&
				<div>
					<button onClick={this.handleAgain}>Again</button>
				</div>
			}
			
		</ScrollView>
		);
	}
}

export default Quiz;