import React, { Component } from "react";
import Question from "./Question";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.state = {
			questions: [],
			isError: false
		};
  }

  getQuestions = (questionCode) => {
		if(questionCode === '1') {
			this.setState(
				{
					isError: false,
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
					isError: false,
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
		} else {
			this.setState({
				...this.state,
				isError: true
			})
		}
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
		} else {
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