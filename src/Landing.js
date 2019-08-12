import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ButtonCard from './ButtonCard';

import FormControl from '@material-ui/core/FormControl';
import logo from './logo-hijau.png';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      inputSearch: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      window.location.href = `/search/${this.state.inputSearch}`;
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state.inputSearch);
  }

  render() {
    const { classes } = this.props;
    const images = [
      {
        url: '/asset/herbsmed.jpeg',
        title: 'Herbal Medicine',
        directory: '/herbmeds'
      },
      {
        url: '/asset/plant.jpeg',
        title: 'Plant',
        directory: '/plant'
      },
      {
        url: '/asset/compound.jpeg',
        title: 'Compound',
        directory: '/compound'
      },
      {
        url: '/asset/comparision.jpeg',
        title: 'Comparision',
        directory: '/compare'
      },
      {
        url: '/asset/prediction.jpeg',
        title: 'Prediction',
        directory: '/predict'
      },
      {
        url: '/asset/tacit.jpeg',
        title: 'Tacit Knowledge',
        directory: '/tacit'
      },
      {
        url: '/asset/explicit.jpeg',
        title: 'Explicit Knowledge',
        directory: '/explicit'
      },
      {
        url: '/asset/plant_ethnic.jpeg',
        title: 'Plant Used Ethnic',
        directory: '/map/ethnic'
      }
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            //justifyContent: "center",
            alignItems: 'center',
            backgroundImage: `url(/asset/bg-search.png)`,
            backgroundSize: 'cover'
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              fontSize: '3em',
              fontWeight: '600',
              margin: '100px 0 0 0',
              color: 'white'
            }}
          >
            {' '}
            Explore Herbal Medicine{' '}
          </h3>
          <h3
            style={{
              textAlign: 'center',
              fontSize: '1.5em',
              fontWeight: '300',
              margin: '0 0 30px 0',
              color: 'white'
            }}
          >
            {' '}
            Quickly find Jamu, Kampo, Plant, Tacit and Explicit here{' '}
          </h3>

          <Paper className={classes.root} elevation={1}>
            <FormControl className={classes.margin}></FormControl>
            <InputBase
              className={classes.input}
              name="inputSearch"
              value={this.state.inputSearch}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleInputChange}
              placeholder="Search here..."
            />
            <IconButton
              href={`/search/${this.state.inputSearch}`}
              className={classes.iconButton}
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div
          style={{
            width: '95%',
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
            gridGap: '2rem'
          }}
        >
          {images.map(image => {
            return <ButtonCard image={image} />;
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f1f1f1'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              minWidth: '300px',
              backgroundColor: 'light-grey',
              color: 'grey',
              marginTop: '30px',
              marginBottom: '30px'
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                fontSize: '3em',
                fontWeight: '200',
                margin: '0 0 3vh 0'
              }}
            >
              {' '}
              What is KMS Jamu ?{' '}
            </h3>
            <div
              style={{
                fontSize: '1.25em'
              }}
            >
              {' '}
              Knowledge Management System Jamu (KMS Jamu) is web application for
              various kinds of crude drug systems. Plug-in system for adding and
              cross-searching other traditional crude drug system, for instance
              TCM and Ayurveda.{' '}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse'
              }}
            >
              <img
                style={{
                  marginBottom: '20px'
                }}
                src={logo}
                alt="Logo"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
