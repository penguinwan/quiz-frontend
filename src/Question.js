import React, { Component } from "react";
import {Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

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
      <Box textAlign="left" boxShadow={1} p={2} b={3}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{this.props.question}</FormLabel>
        <RadioGroup name="answer" onChange={this.handleChange}>
        {
          this.props.answers.map(({key, value}) => {
            return (
              <FormControlLabel key={key} value={key} control={<Radio />} label={value} />
            );
          })
        }
        </RadioGroup>
      </FormControl>
      </Box>
    );
  }

}

export default Question;