import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'

import logo from './logo-header.png';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navigation extends Component {
  state = {
    anchorEl: null,
    anchorAnalize: null
  };

  logout = event => {
      localStorage.removeItem("user");
      window.location.href = '/';
    }
  
    handleMenu = event => {
      console.log(event.currentTarget)
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

   
  render() {
    const { classes } = this.props;

    const { anchorEl } = this.state;
    const { anchorAnalize } = this.state;

    const open = Boolean(anchorEl);

    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    console.log(user)

    return (
      <div className={classes.root}>
        <AppBar 
        variant="dense"
        position="fixed"
        style={{
          backgroundColor:"#7AC143"
        }}
        >
          <Toolbar>
          <img style={{
                height: "40px",
                marginTop: "5px",
                width: "12%"
              }}
              src={logo} alt="Logo" />
            <div className="menu" style={{
              width:"80%",
              display:"flex",
            }}>
              
              <ul style={{
                paddingLeft:"15px"
              }}>
                    <li><Link to='/'>Home</Link></li>

                    <div class="dropdown">
                        <li>Knowledge Sharing </li>
                        <div class="dropdown-content">
                            <Link to="/tacit">Tacit</Link>
                            <Link to="/explicit">Explicit</Link>
                        </div>
                    </div> 

                    <div class="dropdown">
                        <li>Analize</li>
                        <div class="dropdown-content">
                            <Link to="/compare">Comparison</Link>
                            <Link to="/predict">Prediction</Link>
                        </div>
                    </div> 

                    <div class="dropdown">
                        <li>Explore</li>
                        <div class="dropdown-content">
                            <Link to="/herbmeds">Herbal Medicine</Link>
                            <Link to="/plant">Plant</Link>
                            <Link to="/compound">Compounds</Link>
                        </div>
                    </div> 

                    <li><Link to='/map/ethnic'>Map Ethnic</Link></li>

                   
                    
                </ul>
            </div>
           
            <div style={{
              width:"20%",
              display:"flex",
              flexDirection:"row-reverse"
            }}>
            {user === null 
              ? 
              <Button 
              style={{
                textDecoration: "none"
              }}
              color="inherit">
                <Link style={{
                  textDecoration: "none"
                }}
                to={`/login`}>
                    Login
                </Link>
              </Button>
              : 
              <Button onClick={this.logout} color="inherit">
                    Logout
              </Button>
              }
              </div>
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);