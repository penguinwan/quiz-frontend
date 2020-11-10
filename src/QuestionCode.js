import React, { Component } from "react";
import { Box, Button, TextField } from '@material-ui/core';

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
      <Box m={2}>
        <TextField id="standard-basic" label="Question code" value={this.state.questionCode} onChange={this.handleChange} disabled={this.props.isDisabled}/>
        { !this.props.isDisabled && <Button onClick={this.handleSubmit} variant="contained" color="primary">Start</Button> }
      </Box>
    );
  }

}

export default QuestionCode;