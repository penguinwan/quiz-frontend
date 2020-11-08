import React, { Component } from "react";
import { TextInput } from 'react-native';

class QuestionCode extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      questionCode: ""
    }
  }

  handleSubmit() {
    this.props.handleQuestionCodeUpdate(this.state.questionCode);
  }

  handleChange(event) {
    this.setState({questionCode: event.target.value});
  }

  render() {
    return(
      <div>
        <label>
          Question code:
          <input type="text" value={this.state.questionCode} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleSubmit}>Start</button>
      </div>
    );
  }

}

export default QuestionCode;