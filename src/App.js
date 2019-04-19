import React, { Component } from 'react';

import ButtonAppBar from './Navigation'
import Compare from './ComparePage'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <ButtonAppBar />  
          <Compare />
      </div>
    );
  }
}

export default App;
