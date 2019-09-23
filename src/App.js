import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';

import Landing from './pages/LandingPage/Landing';
import KnowledgePage from './pages/KnowledgePage/KnowledgePage';
import DetailExplicit from './pages/KnowledgeDetail/DetailExplicit';
// import TacitPage from "./TacitPage";
// import DetailTacit from "./DetailTacit";
import ComparePage from './pages/ComparePage/ComparePage';
import Predict from './pages/PredictPage/PredicPage';
import Plant from './pages/PlantPage/PlantPage';
// import FormExplicit from "./FormExplicit";
// import FormTacit from "./FormTacit";
import MapHerb from './pages/MapethnicPage/MapEthnic';
import HerbMeds from './pages/HerbmedPage/HerbMedPage';
import EthnicDetail from './pages/EthnicDetail/EthnicDetail';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import SearchPage from './pages/SearchPage/SearchPage';

import CompoundPage from './pages/CompoundPage/CompoundPage';

import DetailHerbMed from './pages/HerbmedDetail/DetailHerbMed';
import DetailCompound from './pages/CompoundDetail/DetailCompound';

import NotFound from './pages/NotfoundPage/404';

import TopButton from './components/top-button/TopButton';
import axios from 'axios';

import './App.css';
import DetailPlant from './pages/PlantDetail/DetailPlant';
import { ProtectedRoute } from './protected.route';
import Footer from './components/footer/Footer';

axios.defaults.baseURL = 'https://api.jamumedicine.com';
// axios.defaults.baseURL = 'http://localhost:3003';
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
          <Navigation />
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

              <ProtectedRoute
                exact
                path="/knowledge"
                component={KnowledgePage}
              />
              <ProtectedRoute
                exact
                path="/explicit/:id"
                component={DetailExplicit}
              />
              {/* <ProtectedRoute
                exact
                path="/form/explicit"
                component={FormExplicit}
              /> */}

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

              {/* <ProtectedRoute exact path="/tacit" component={TacitPage} />
              <ProtectedRoute exact path="/tacit/:id" component={DetailTacit} />
              <ProtectedRoute exact path="/form/tacit" component={FormTacit} /> */}

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
