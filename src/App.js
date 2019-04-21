import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom'
import ButtonAppBar from './Navigation'

import ExplicitPage from './ExplicitPage'
import DetailExplicit from './DetailExplicit'
import ComparePage from './ComparePage'
import Predict from './PredicPage'
import Plant from './PlantPage'
import FormExplicit from './FormExplicit'
import FormTacit from './FormTacit'
import MapHerb from './MapEthnic'
import EthnicDetail from './EthnicDetail'


import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar/>
        
        <Switch>
          <Route exact path="/explicit" component={ExplicitPage} />
          <Route path="/explicit/:id" component={DetailExplicit} />
          <Route exact path="/form/explicit" component={FormExplicit} />
          
          <Route exact path="/compare" component={ComparePage} />
          <Route exact path="/predict" component={Predict} />

          <Route exact path="/plant" component={Plant} />
          {/* herbmed */}
          {/* compound */}
          
          {/* tacitpage */}
          {/* detailtacil */}
          <Route exact path="/form/tacit" component={FormTacit} />
          
          
          <Route exact path="/map/ethnic" component={MapHerb} />
          <Route exact path="/ethnic/:id" component={EthnicDetail} />

          {/* home */}

          {/* login */}
          {/* register */}

          {/* 404 */}

        </Switch>
      </div>
    );
  }
}

export default App;
