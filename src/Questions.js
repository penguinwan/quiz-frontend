import React, { Component } from "react";
import Question from "./Question";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.state = {
			questions: []
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

  componentDidMount() {
    this.getQuestions(this.props.questionCode);
  }

  handleQuestionUpdate(answer) {
    this.props.handleQuestionUpdate(answer);
  }

  render() {
    return(
      <div >
			{ 
				this.state.questions.length > 0 && 
				this.state.questions.map(({id, question, answers}) => { 
				return(
					<Question 
						key={id} 
						id={id} 
						question={question} 
						answers={answers} 
						handleQuestionUpdate={this.handleQuestionUpdate}/>
				) 
			})
			}
			</div>
    );
  }

}

export default Questions;