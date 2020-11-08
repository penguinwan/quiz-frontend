import React, { Component } from "react";
import { TextInput } from 'react-native';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      nickname: ""
    }
  }

  handleSubmit() {
    this.props.handleRegistrationUpdate(this.state.nickname);
  }

  handleChange(event) {
    this.setState({nickname: event.target.value});
  }

  render() {
    return(
      <div>
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