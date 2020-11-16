import { BATCH_PATH, RESULT_PATH } from './env'
import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";
import { Box, Button, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Questions extends Component {
  constructor(props) {
    super(props);
		this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
		this.handleQuestionCodeUpdate = this.handleQuestionCodeUpdate.bind(this);
		this.handleQuestionCodeSubmit = this.handleQuestionCodeSubmit.bind(this);
    this.state = {
			questionCode: "",
			questions: [],
			answers: [],
			isError: false,
			errorMessage: null,
			isQuestionCodeDisabled: false,
			questionReceivedTimestamp: null
		};
  }

	async getQuestions(questionCode) {
		axios.get(`${BATCH_PATH}/batches/${questionCode.toLowerCase()}`)
			.then((response) => {
				this.setState({
					...this.state,
					isError: false,
					errorMessage: null,
					questions: response.data.questions,
					isQuestionCodeDisabled: true,
					questionReceivedTimestamp: Date.now()
				})
			})
			.catch((error) => {
				if(error.response.status === 404) {
					this.setState({
						...this.state,
						isError: true,
						errorMessage: 'Wrong question code.',
						questions: [],
						isQuestionCodeDisabled: false
					})
				} else {
					this.setState({
						...this.state,
						isError: true,
						errorMessage: 'Server error.',
						questions: [],
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
			result  = <div>{questions}<Button variant="contained" color="primary" onClick={this.handleQuestionSubmit}>Submit</Button></div>
		}
    return(
			<div>
			<Box m={2}>
        <TextField id="standard-basic" label="Question code" value={this.state.questionCode} onChange={this.handleQuestionCodeUpdate} disabled={this.state.isQuestionCodeDisabled}/>
				{ !this.state.isQuestionCodeDisabled && <Button onClick={this.handleQuestionCodeSubmit} variant="contained" color="primary">Start</Button> }
      </Box>
			<Box m={2}>{result}</Box>
			</div>
		);
  }

}

export default Questions;