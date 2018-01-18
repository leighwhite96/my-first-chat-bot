import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import openSocket from 'socket.io-client';
import { ChatFeed, Message } from 'react-chat-ui';
import { Widget, addResponseMessage } from 'react-chat-widget';

const socket = openSocket('http://localhost:5000');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: ''
    }
    socket.on('fromServer', (res) => this.setState({response: res.server}))
  }

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  addResponse = () => addResponseMessage(this.state.response)

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    socket.emit('fromClient', newMessage);
    setTimeout(this.addResponse,2000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar='http://clipartist.net/Holidays/Halloween/Halloween/robot_girl_ryofu_quimby_halloween-1969px.png'
        />
      </div>
    );
  }
}

export default App;
