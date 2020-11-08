import React, { Component } from "react";
import { ScrollView } from 'react-native';
import Registration from "./Registration";
import QuestionCode from "./QuestionCode";
import Questions from "./Questions";

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
		this.handleRegistrationUpdate = this.handleRegistrationUpdate.bind(this);
		this.handleQuestionCodeUpdate = this.handleQuestionCodeUpdate.bind(this);
		this.state = {
			showRegistration: true,
			showQuestionCode: false,
			showQuestions: false,
			nickname: "",
			sessionid: "",
			questionCode: "",
			questions: [],
			answers: []
		};
	}

	getQuestions = (questionCode) => {
		if(questionCode === '1') {
			this.setState(
				{
					questions: [
						{
							id: "1",
							question: "abc",
							answers: [
								{ key: "a", value: "A"},
								{ key: "b", value: "B" },
								{ key: "c", value: "C" },
								{ key: "d", value: "D" }
							]
						},
						{
							id: "2",
							question: "efg",
							answers: [
								{ key: "a", value: "A" },
								{ key: "b", value: "B" },
								{ key: "c", value: "C" },
								{ key: "d", value: "D" }
							]
						}
					]
				}
			)
		} else if(questionCode === '2') {
			this.setState(
				{
					questions: [
						{
							id: "3",
							question: "abc3",
							answers: [
								{ key: "a", value: "A"},
								{ key: "b", value: "B" },
								{ key: "c", value: "C" },
								{ key: "d", value: "D" }
							]
						},
						{
							id: "4",
							question: "efg4",
							answers: [
								{ key: "a", value: "A" },
								{ key: "b", value: "B" },
								{ key: "c", value: "C" },
								{ key: "d", value: "D" }
							]
						}
					]
				}
			)
		}
	}

	handleSubmit() {
		this.setState({
			showRegistration: false,
			showQuestionCode: true,
			showQuestions: false,
			nickname: "",
			sessionid: "",
			questionCode: null,
			questions: [],
			answers: []
		});
	}

	handleRegistrationUpdate(nickname) {
		this.setState({
			...this.state,
			nickname,
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
						handleQuestionUpdate={this.handleQuestionUpdate}/>
				<button onClick={this.handleSubmit}>Submit</button>
				</div>
			}
			
		</ScrollView>
		);
	}
}

export default Quiz;