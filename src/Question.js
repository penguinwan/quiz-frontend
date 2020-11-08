import React, { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    id: this.props.id,
  }

  handleChange(event) {
    const newState = {
      ...this.state,
      answer: event.target.value
    }
    this.setState(newState);
    this.props.handleQuestionUpdate(newState);
  }

  render() {
    return(
      <div>
      <form>
      <label>
      {this.props.question}
      {
        this.props.answers.map(({key, value}) => {
          return (
            <label>
            <input
              type="radio"
              name="answer"
              value={key}
              onChange={this.handleChange}
            />
            {value}
          </label>
          );
        })
      }
      </label>
      </form>
      </div>
    );
  }

}

export default Question;