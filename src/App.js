import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom'
import ButtonAppBar from './Navigation'

import Landing from './Landing'
import ExplicitPage from './ExplicitPage'
import DetailExplicit from './DetailExplicit'
import TacitPage from './TacitPage'
import DetailTacit from './DetailTacit'
import ComparePage from './ComparePage'
import Predict from './PredicPage'
import Plant from './PlantPage'
import FormExplicit from './FormExplicit'
import FormTacit from './FormTacit'
import MapHerb from './MapEthnic'
import HerbMeds from './HerbMedPage'
import EthnicDetail from './EthnicDetail'
import Login from './Login'
import Register from './Register'

import DetailHerbMed from './DetailHerbMed'

import NotFound from './404'


import './App.css'

class App extends Component {
  
  render() {
    const path = window.location.pathname;
    return(
      <div>
        {path !== '/login' && path !== '/register' ?
            <ButtonAppBar/>
            :
            null
          }
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route exact path="/explicit" component={ExplicitPage} />
          <Route exact  path="/explicit/:id" component={DetailExplicit} />
          <Route exact path="/form/explicit" component={FormExplicit} />
          
          <Route exact path="/compare" component={ComparePage} />
          <Route exact path="/predict" component={Predict} />

          <Route exact path="/plant" component={Plant} />
          <Route exact path="/herbmeds" component={HerbMeds} />
          {/* compound */}
          
          <Route exact path="/tacit" component={TacitPage} />
          <Route exact path="/tacit/:id" component={DetailTacit} />
          <Route exact path="/form/tacit" component={FormTacit} />
          
          
          <Route exact path="/map/ethnic" component={MapHerb} />
          <Route exact path="/ethnic/:id" component={EthnicDetail} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/detail/herbmed/:id" component={DetailHerbMed} />
          <Route exact path='*'  component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
