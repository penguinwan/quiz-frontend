import { BATCH_PATH, RESULT_PATH } from './env'
import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";
import { Box, Button, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const REMAINING_TIME = 3;

class Questions extends Component {
  constructor(props) {
		super(props);
		this.submitTimeout = null;
		this.reminderTimout = null;
		this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
		this.handleQuestionCodeUpdate = this.handleQuestionCodeUpdate.bind(this);
		this.handleQuestionCodeSubmit = this.handleQuestionCodeSubmit.bind(this);
		this.handleReminderClosed = this.handleReminderClosed.bind(this);
    this.state = {
			questionCode: "",
			questions: [],
			answers: [],
			isError: false,
			errorMessage: null,
			isQuestionCodeDisabled: false,
			questionReceivedTimestamp: null,
			allowedTime: null,
			isReminderOpen: false
		};
	}
	
	handleReminderOpen() {
		this.setState({
			...this.state,
			isReminderOpen: true
		})
	}

	handleReminderClosed(event, reason) {
		if (reason === 'clickaway') {
      return;
		}
		
		this.setState({
			...this.state,
			isReminderOpen: false
		})
	}

	async getQuestions(questionCode) {
		axios.get(`${BATCH_PATH}/batches/${questionCode.toLowerCase()}`)
			.then((response) => {
				this.setState({
					...this.state,
					isError: false,
					errorMessage: null,
					questions: response.data.questions,
					allowedTime: response.data.allowed_time,
					isQuestionCodeDisabled: true,
					questionReceivedTimestamp: Date.now()
				})

				this.reminderTimeout = setTimeout(() => {
					this.handleReminderOpen();
				}, (this.state.allowedTime - REMAINING_TIME * 1000));

				this.submitTimeout = setTimeout(() => {
					this.handleQuestionSubmit();
				}, this.state.allowedTime);
			})
			.catch((error) => {
				if(error.response.status === 404) {
					this.setState({
						...this.state,
						isError: true,
						errorMessage: 'Wrong question code.',
						questions: [],
						allowedTime: null,
						isQuestionCodeDisabled: false
					})
				} else {
					this.setState({
						...this.state,
						isError: true,
						errorMessage: 'Server error.',
						questions: [],
						allowedTime: null,
						isQuestionCodeDisabled: false
					})
				}
			});
	}

	handleQuestionCodeUpdate(event) {
    this.setState({
      ...this.state,
      questionCode: event.target.value
    });
  }

	handleQuestionCodeSubmit() {
		this.getQuestions(this.state.questionCode);
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
		clearTimeout(this.reminderTimeout);
		clearTimeout(this.submitTimeout);

		const response_time = Date.now() - this.state.questionReceivedTimestamp;
		axios.post(
			`${RESULT_PATH}/answers`,
			{ 
				batch_id: this.state.questionCode, 
				session_id: this.props.sessionid, 
				answers: this.state.answers, 
				response_time 
			}
		).then(() => {
			this.setState({
				questions: [],
				answers: [],
				isError: false,
				errorMessage: null
			});
			this.props.handleQuestionSubmit();
		}).catch((error) => {
			let errorMessage = 'Internal server error.'
			this.setState({
				...this.state,
				isError: true,
				errorMessage
			})
		})
	}

	componentWillUnmount() {
		clearTimeout(this.reminderTimeout);
		clearTimeout(this.submitTimeout);
	}

  render() {
		let result;
		if(this.state.isError) {
			result = <Alert severity="error">{ this.state.errorMessage }</Alert>;
		} else if(this.state.questions.length > 0) {
			const questions = this.state.questions.map(({id, question, answers}) => {
				return (
					<Question 
						key={id} id={id} 
						question={question} 
						answers={answers} 
						handleQuestionUpdate={this.handleQuestionUpdate}/>
				);
			});
			result  = <div>{questions}<Button id="questions-submit" variant="contained" color="primary" onClick={this.handleQuestionSubmit}>Submit</Button></div>
		}
    return(
			<div>
			<Box m={2}>
        <TextField id="txtKey" autoComplete="off" label="Key" value={this.state.questionCode} onChange={this.handleQuestionCodeUpdate} disabled={this.state.isQuestionCodeDisabled}/>
				{ !this.state.isQuestionCodeDisabled && <Button id="key-submit" onClick={this.handleQuestionCodeSubmit} variant="contained" color="primary">Start</Button> }
      </Box>
			<Box m={2}>{result}</Box>
			<Snackbar 
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }} 
				key="snackbar" 
				open={this.state.isReminderOpen} 
				autoHideDuration={REMAINING_TIME*1000} 
				onClose={this.handleReminderClosed}>
				<Alert severity="warning">You still have {REMAINING_TIME} seconds</Alert>
			</Snackbar>
			</div>
		);
  }

}

export default Questions;