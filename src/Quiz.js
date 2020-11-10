import React, { Component } from "react";
import { ScrollView } from 'react-native';
import Registration from "./Registration";
import QuestionCode from "./QuestionCode";
import Questions from "./Questions";
import { Box, Button } from '@material-ui/core';

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.handleRegistrationUpdate = this.handleRegistrationUpdate.bind(this);
		this.handleQuestionCodeUpdate = this.handleQuestionCodeUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.state = {
			showRegistration: true,
			isRegistrationDisabled: false,
			showQuestionCode: false,
			isQuestionCodeDisabled: false,
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
			isRegistrationDisabled: true,
			showQuestionCode: true
		})
	}

	handleQuestionCodeUpdate(questionCode) {
		this.setState({
			...this.state,
			questionCode,
			showQuestions: true,
			isQuestionCodeDisabled: true,
		})
	}

	handleQuestionSubmit() {
		this.setState({
			...this.state,
			showRegistration: false,
			isRegistrationDisabled: false,
			showQuestionCode: false,
			isQuestionCodeDisabled: false,
			showQuestions: false,
			showEnd: true,
			questionCode: null,
			questions: []
		});
	}

	handleNext() {
		this.setState({
			...this.state,
			showRegistration: true,
			isRegistrationDisabled: true,
			showQuestionCode: true,
			isQuestionCodeDisabled: false,
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
				<Registration nickname={this.state.nickname} isDisabled={this.state.isRegistrationDisabled} handleRegistrationUpdate={this.handleRegistrationUpdate}/>
			}
			{
				this.state.showQuestionCode && 
				<QuestionCode isDisabled={this.state.isQuestionCodeDisabled} handleQuestionCodeUpdate={this.handleQuestionCodeUpdate}/>
			}
			
			{ this.state.showQuestions && 
				<Questions 
					sessionid={this.state.sessionid}
					questionCode={this.state.questionCode} 
					handleQuestionSubmit={this.handleQuestionSubmit}/>
			}

			{  this.state.showEnd &&
				<Box textAlign="center" m={2} p={3}>
					<Button onClick={this.handleNext} variant="contained" color="primary">Next</Button>
				</Box>
			}
			
		</ScrollView>
		);
	}
}

export default Quiz;