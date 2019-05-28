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
            <div className="menu" style={{
              width:"50%",
              display:"flex",
              
            }}>
              <ul>
                    <li><Link to='/'>Home</Link></li>

                    <div class="dropdown">
                        <li>Knowledge Sharing </li>
                        <div class="dropdown-content">
                            <a href="/tacit">Tacit</a>
                            <a href="/explicit">Explicit</a>
                        </div>
                    </div> 

                    <div class="dropdown">
                        <li>Analize</li>
                        <div class="dropdown-content">
                            <a href="/compare">Comparison</a>
                            <a href="/predict">Prediction</a>
                        </div>
                    </div> 

                    <div class="dropdown">
                        <li>Explore</li>
                        <div class="dropdown-content">
                            <a href="/herbmeds">Herbal Medicine</a>
                            <a href="/plant">Plant</a>
                            <a href="/compound">Compounds</a>
                        </div>
                    </div> 

                    <li><Link to='/map/ethnic'>Map Ethnic</Link></li>

                   
                    
                </ul>
            </div>
           
            <div style={{
              width:"50%",
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