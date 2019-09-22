import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Up from '@material-ui/icons/ArrowUpward';

class TopButton extends Component {
  toTop() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Fab
        style={{
          position: 'fixed',
          width: '45px',
          height: '45px',
          bottom: '25px',
          right: '25px',
          backgroundColor: '#89b143'
        }}
        color="primary"
        aria-label="Add"
        onClick={this.toTop}
      >
        <Up />
      </Fab>
    );
  }
}

export default TopButton;
