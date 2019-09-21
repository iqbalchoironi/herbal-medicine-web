import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ButtonAppBar from './Navigation';

import Landing from './Landing';
import ExplicitPage from './ExplicitPage';
import DetailExplicit from './DetailExplicit';
import TacitPage from './TacitPage';
import DetailTacit from './DetailTacit';
import ComparePage from './ComparePage';
import Predict from './PredicPage';
import Plant from './PlantPage';
import FormExplicit from './FormExplicit';
import FormTacit from './FormTacit';
import MapHerb from './MapEthnic';
import HerbMeds from './HerbMedPage';
import EthnicDetail from './EthnicDetail';
import Login from './Login2';
import Register from './Register';
import SearchPage from './SearchPage';

import CompoundPage from './CompoundPage';

import DetailHerbMed from './DetailHerbMed';
import DetailCompound from './DetailCompound';

import NotFound from './404';

import TopButton from './TopButton';
import axios from 'axios';

import './App.css';
import DetailPlant from './DetailPlant';
import { ProtectedRoute } from './protected.route';
import Footer from './Footer';

// axios.defaults.baseURL = "https://api.jamumedicine.com";
axios.defaults.baseURL = 'http://localhost:3003';
//axios.defaults.baseURL = "http://117.53.45.222:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false
    };
    this.ok = this.ok.bind(this);
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.ok, false);
  }
  async ok() {
    if (window.scrollY >= 100) {
      await this.setState({
        top: true
      });
    } else {
      await this.setState({
        top: false
      });
    }
  }
  render() {
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/register') {
      return (
        <div>
          <ButtonAppBar />
          <div
            style={{
              minHeight: '600px'
            }}
          >
            <Switch>
              <ProtectedRoute exact path="/" component={Landing} />
              <ProtectedRoute
                exact
                path="/search/:query"
                component={SearchPage}
              />

              <ProtectedRoute exact path="/explicit" component={ExplicitPage} />
              <ProtectedRoute
                exact
                path="/explicit/:id"
                component={DetailExplicit}
              />
              <ProtectedRoute
                exact
                path="/form/explicit"
                component={FormExplicit}
              />

              <ProtectedRoute exact path="/compare" component={ComparePage} />
              <ProtectedRoute exact path="/predict" component={Predict} />

              <ProtectedRoute exact path="/plant" component={Plant} />
              <ProtectedRoute exact path="/plant/:id" component={DetailPlant} />
              <ProtectedRoute exact path="/herbmeds" component={HerbMeds} />
              <ProtectedRoute
                exact
                path="/herbsmed/:id"
                component={DetailHerbMed}
              />
              <ProtectedRoute exact path="/compound" component={CompoundPage} />
              <ProtectedRoute
                exact
                path="/detail/compound/:id"
                component={DetailCompound}
              />

              <ProtectedRoute exact path="/tacit" component={TacitPage} />
              <ProtectedRoute exact path="/tacit/:id" component={DetailTacit} />
              <ProtectedRoute exact path="/form/tacit" component={FormTacit} />

              <ProtectedRoute exact path="/map/ethnic" component={MapHerb} />
              <ProtectedRoute
                exact
                path="/ethnic/:id"
                component={EthnicDetail}
              />

              <ProtectedRoute exact path="/login" component={Login} />
              <ProtectedRoute exact path="/register" component={Register} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
          {this.state.top ? <TopButton /> : null}
          <Footer />
        </div>
      );
    }
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App;
