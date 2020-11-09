import React, { Component } from "react";
import axios from "axios";

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
      <div>
        { this.state.isError && <label>{ this.state.errorMessage }</label> }
        <label>
          Nickname:
          <input type="text" value={this.state.nickname} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleSubmit}>Done</button>
      </div>
    );
  }

}

export default Registration;