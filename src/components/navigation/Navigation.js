import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import logo from './logo-header.svg';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends Component {
  state = {
    anchorEl: null,
    anchorAnalize: null
  };

  logout = event => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          variant="dense"
          style={{
            backgroundColor: '#89b143'
          }}
        >
          <Toolbar>
            <img
              style={{
                height: '40px',
                marginTop: '-20px',
                width: '12%'
              }}
              src={logo}
              alt="Logo"
            />
            <div
              className="menu"
              style={{
                width: '80%',
                display: 'flex'
              }}
            >
              <ul
                style={{
                  paddingLeft: '15px'
                }}
              >
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/map/ethnic">Map Ethnic</Link>
                </li>

                <li>
                  <Link to="/knowledge">Knowledge</Link>
                </li>

                <div class="dropdown">
                  <li>Analysis</li>
                  <div class="dropdown-content">
                    <Link to="/compare">Compare Formulas</Link>
                    <Link to="/predict">Prediction of Therapeutic Usage</Link>
                  </div>
                </div>

                <div class="dropdown">
                  <li>Explore</li>
                  <div class="dropdown-content">
                    <Link to="/herbmeds">Herbal Medicines</Link>
                    <Link to="/plant">Plants</Link>
                    <Link to="/compound">Compounds</Link>
                  </div>
                </div>
              </ul>
            </div>

            {/* <div
              style={{
                width: '20%',
                display: 'flex',
                flexDirection: 'row-reverse'
              }}
            >
              {user ? (
                <div
                  style={{
                    display: 'flex'
                  }}
                >
                  <p>{user.data.name}</p>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  style={{
                    backgroundColor: 'white'
                  }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )}
            </div> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
