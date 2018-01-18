import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { chat } from './api';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      value: ''
    }
    socket.on('fromServer', (res) => this.setState({response: res.server}))
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })}


  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    socket.emit('fromClient', this.state.value)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.response}
        <p className="App-intro">

            <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}></button>

        </p>
      </div>
    );
  }
}

export default App;
