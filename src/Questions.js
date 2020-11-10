import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";
import { Box, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Questions extends Component {
  constructor(props) {
    super(props);
		this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.state = {
			questions: [],
			answers: [],
			isError: false,
			errorMessage: null
		};
  }

	async getQuestions(questionCode) {
		axios.get(`http://localhost:8080/batch/${questionCode}/questions`)
			.then((response) => {
				this.setState({
					...this.state,
					isError: false,
					errorMessage: null,
					questions: response.data.questions
				})
			})
			.catch((error) => {
				this.setState({
					...this.state,
					isError: true,
					errorMessage: 'Wrong question code.'
				})
			});
	}

  componentDidMount() {
		this.getQuestions(this.props.questionCode);
	}
	
	componentDidUpdate(previousProp) {
		if(previousProp.questionCode !== this.props.questionCode) {
			this.getQuestions(this.props.questionCode);
		}
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
		axios.post(
			`http://localhost:8080/batch/${this.props.questionCode}/answers`,
			{ sessionid: this.props.sessionid, answers: this.state.answers }
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
			if(error.response.status === 403) {
				errorMessage = 'You have submitted answer before.'
			}
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
    return(<Box m={2}>{result}</Box>);
  }

}

export default Questions;