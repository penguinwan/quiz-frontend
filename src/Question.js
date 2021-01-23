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
    const radioGroupId = 'question['+this.state.id+']';
    return(
      <Box textAlign="left" boxShadow={1} p={2} b={3}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{this.props.question}</FormLabel>
        <RadioGroup id={radioGroupId} name="answer" onChange={this.handleChange}>
        {
          this.props.answers.map(({key, value}) => {
            const radioName = 'question['+this.state.id+']answer['+key+']';
            return (
              <FormControlLabel key={key} value={key} control={<Radio name={radioName}/>} label={value} />
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