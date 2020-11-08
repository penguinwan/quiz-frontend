import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import './App.css';
import Quiz from './Quiz';


class App extends Component {
handleSubmit(event) {
    alert('An essay was submitted: ');
    event.preventDefault();
  }

  render() {
    return (
      <Quiz/>
    );
  }
}

export default App;
