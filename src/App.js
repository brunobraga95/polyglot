import React, { Component } from 'react';
import SentenceType from './containers/SentenceType';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SentenceType />
      </div>
    );
  }
}

App.defaultProps = {
  word: "Bruno Braga"
}

export default App;
