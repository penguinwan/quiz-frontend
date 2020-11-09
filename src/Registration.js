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
      nickname: "",
      isError: false,
      errorMessage: null
    }
  }

  handleSubmit() {
    axios.post(
      'http://localhost:8080/registration',
      { nickname: this.state.nickname }
    ).then((response) => {
      this.setState({
        ...this.state,
        isError: false,
        errorMessage: null
      })
      this.props.handleRegistrationUpdate({ 
        nickname: this.state.nickname, 
        sessionid: response.data.sessionid
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
      <Box textAlign="center">
        { this.state.isError && <Alert severity="error">{ this.state.errorMessage }</Alert> }
        <TextField id="standard-basic" label="Nickname" value={this.state.nickname} onChange={this.handleChange}/>
        <Button onClick={this.handleSubmit} variant="contained" color="primary">Done</Button>
      </Box>
    );
  }

}

export default Registration;