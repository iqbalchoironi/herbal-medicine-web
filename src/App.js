import React, { Component } from 'react';

import ButtonAppBar from './Navigation'
import Analize from './PredicPage'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <ButtonAppBar />  
          <Analize />
      </div>
    );
  }
}

export default App;
