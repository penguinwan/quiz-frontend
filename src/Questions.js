import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.state = {
			questions: [],
			isError: false
		};
  }

	async getQuestions(questionCode) {
		axios.get(`http://localhost:8080/batch/${questionCode}/questions`)
			.then((response) => {
				this.setState({
					isError: false,
					questions: response.data.questions
				})
			})
			.catch((error) => {
				this.setState({
					...this.state,
					isError: true
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
    this.props.handleQuestionUpdate(answer);
  }

  render() {
		let result;
		if(this.state.isError) {
			result = <label>No questions</label>;
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
			result  = <div>{questions}<button onClick={this.props.handleQuestionSubmit}>Submit</button></div>
		}
    return(<div>{result}</div>);
  }

}

export default Questions;