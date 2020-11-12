import { basepath } from './env'
import React, { Component } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      nickname: this.props.nickname,
      isError: false,
      errorMessage: null
    }
  }

  handleSubmit() {
    axios.post(
      `${basepath}/participants`,
      { nickname: this.state.nickname }
    ).then((response) => {
      this.setState({
        ...this.state,
        isError: false,
        errorMessage: null
      })
      this.props.handleRegistrationUpdate({ 
        nickname: this.state.nickname, 
        sessionid: response.data.session_id
      });
    }).catch((error) => {
      this.setState({
        ...this.state,
        isError: true,
        errorMessage: 'Failed registration. Try again.'
      })
    });
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      nickname: event.target.value
    });
  }

  render() {
    return(
      <Box m={2}>
        { this.state.isError && <Alert severity="error">{ this.state.errorMessage }</Alert> }
        <TextField id="standard-basic" label="Nickname" value={this.state.nickname} onChange={this.handleChange} disabled={this.props.isDisabled}/>
        { !this.props.isDisabled && <Button onClick={this.handleSubmit} variant="contained" color="primary">Done</Button> }
      </Box>
    );
  }

}

export default Registration;