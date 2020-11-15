import React, { Component } from "react";
import { ScrollView } from 'react-native';
import Registration from "./Registration";
import Questions from "./Questions";
import { Box, Button } from '@material-ui/core';

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.handleRegistrationUpdate = this.handleRegistrationUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.state = {
			showRegistration: true,
			isRegistrationDisabled: false,
			showQuestions: false,
			showEnd: false,
			nickname: "",
			sessionid: ""
		};
	}

	handleRegistrationUpdate({nickname, sessionid}) {
		this.setState({
			...this.state,
			nickname,
			sessionid,
			isRegistrationDisabled: true,
			showQuestions: true
		})
	}

	handleQuestionSubmit() {
		this.setState({
			...this.state,
			showRegistration: false,
			isRegistrationDisabled: false,
			showQuestions: false,
			showEnd: true
		});
	}

	handleNext() {
		this.setState({
			...this.state,
			showRegistration: true,
			isRegistrationDisabled: true,
			showQuestions: true,
			showEnd: false
		});
	}

	render() {
		return(

		<ScrollView>
			{  this.state.showRegistration &&
				<Registration nickname={this.state.nickname} isDisabled={this.state.isRegistrationDisabled} handleRegistrationUpdate={this.handleRegistrationUpdate}/>
			}
			
			{ this.state.showQuestions && 
				<Questions 
					sessionid={this.state.sessionid}
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