import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Spinner from './Spinner';

import DateRange from '@material-ui/icons/DateRange';
import Pagination from 'material-ui-flat-pagination';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import SnackBar from './SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

import { emphasize } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  formControl: {
    margin: 24
  },
  group: {
    margin: 8
  }
};

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

function ListTacit(props) {
  return (
    <div
      style={{
        marginBottom: '20px'
      }}
    >
      <Typography
        variant="subtitle1"
        style={{
          color: '#1976d8'
        }}
      >
        <Link to={`/tacit/${props.id}`}>{props.title}</Link>
      </Typography>
      {/* <Typography variant="caption">
        <Person /> {props.name}
      </Typography> */}
      <Typography variant="caption">
        <DateRange /> {props.date}
      </Typography>
      {/* <p className="block-with-text">{props.abstract}</p> */}
    </div>
  );
}

class TacitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      inputSearch: '',
      onSearch: [],
      tacit: [],
      currentPage: 1,
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      name: '',
      type: ''
    };
    // this.onScroll = this.onScroll.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataSearch = this.getDataSearch.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.ok = this.ok.bind(this);
  }

  topFunction() {
    window.scrollTo(0, 0);
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

  async componentDidMount() {
    // window.addEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.ok, false);
    this.getData();
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.getDataSearch(event);
    }
  }

  async getData() {
    try {
      const url = '/jamu/api/tacit';
      const res = await Axios.get(url);
      const { data } = await res;
      let newData = this.state.tacit.concat(data.data);
      this.afterUpdate(data.success, data.message);
      this.setState({
        tacit: newData,
        loading: false,
        offset: 5
      });
    } catch (err) {
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
  }

  logout = event => {
    window.location.href = '/form/tacit';
  };
  handleClick(offset, page) {
    this.setState({ offset });
  }

  async getDataSearch() {
    this.setState({
      loadData: true
    });
    const url = '/jamu/api/tacit/search/sort';
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await Axios.get(
      url,
      {
        params: {
          search: this.state.inputSearch
        }
      },
      axiosConfig
    );
    const { data } = await res;
    let newData = data.data;
    this.setState({
      onSearch: newData,
      loadData: false
    });
  }

  async changeFilter(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      [name]: value
    });

    this.setState({
      loadData: true
    });
    const url = '/jamu/api/tacit/search/sort';
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await Axios.get(
      url,
      {
        params: {
          search: this.state.inputSearch,
          date: this.state.date,
          name: this.state.name
        }
      },
      axiosConfig
    );
    const { data } = await res;
    let newData = data.data;

    if (this.state.inputSearch === '') {
      this.setState({
        tacit: newData,
        loadData: false
      });
    } else {
      this.setState({
        onSearch: newData,
        loadData: false
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async afterUpdate(success, message) {
    this.setState({
      snackbar: {
        open: true,
        success: success,
        message: message
      }
    });
  }

  closeBtn() {
    this.setState({
      snackbar: {
        open: false,
        success: false,
        message: ''
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          marginTop: '30px',
          width: '100%'
        }}
      >
        {this.state.top ? (
          <AppBar
            variant="dense"
            style={{
              backgroundColor: '#89b143'
            }}
          >
            <Toolbar>
              <div
                style={{
                  width: '90%',
                  display: 'flex',
                  flexDirection: 'row',
                  margin: 'auto'
                }}
              >
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Paper className={classes.root} elevation={1}>
                    <Breadcrumbs aria-label="breadcrumb">
                      <StyledBreadcrumb
                        component="a"
                        href="/"
                        label="KMS Jamu"
                        avatar={
                          <Avatar className={classes.avatar}>
                            <HomeIcon />
                          </Avatar>
                        }
                      />
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Knowledge"
                      />
                      <StyledBreadcrumb
                        label="Tacit Knowledge"
                        deleteIcon={<ExpandMoreIcon />}
                      />
                    </Breadcrumbs>
                  </Paper>
                </div>
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row-reverse'
                  }}
                >
                  <Paper
                    className={classes.root}
                    style={{
                      width: '400px'
                    }}
                    elevation={1}
                  >
                    <InputBase
                      className={classes.input}
                      name="inputSearch"
                      value={this.state.inputSearch}
                      onChange={this.handleInputChange}
                      onKeyDown={this.handleKeyDown}
                      placeholder="Search based on title"
                    />
                    <IconButton
                      className={classes.iconButton}
                      onClick={this.getDataSearch}
                      aria-label="Search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        ) : null}
        <div
          style={{
            width: '95%',
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto'
          }}
        >
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Paper className={classes.root} elevation={1}>
              <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                  component="a"
                  href="/"
                  label="KMS Jamu"
                  avatar={
                    <Avatar className={classes.avatar}>
                      <HomeIcon />
                    </Avatar>
                  }
                />
                <StyledBreadcrumb component="a" href="#" label="Knowledge" />
                <StyledBreadcrumb
                  label="Tacit Knowledge"
                  deleteIcon={<ExpandMoreIcon />}
                />
              </Breadcrumbs>
            </Paper>
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'row-reverse'
            }}
          >
            <Paper
              className={classes.root}
              style={{
                width: '400px'
              }}
              elevation={1}
            >
              <InputBase
                className={classes.input}
                name="inputSearch"
                value={this.state.inputSearch}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="Search based on title"
              />
              <IconButton
                className={classes.iconButton}
                onClick={this.getDataSearch}
                aria-label="Search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
                width: '95%',
                marginBottom: '10px',
                marginTop: '10px'
              }}
            >
              <div
                style={{
                  width: '20%'
                }}
              >
                <div
                  style={{
                    width: '20%'
                  }}
                >
                  <h3
                    style={{
                      margin: '0'
                    }}
                  >
                    FILTER:
                  </h3>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Date :</FormLabel>
                    <RadioGroup
                      aria-label="Date"
                      name="date"
                      className={classes.group}
                      onChange={this.changeFilter}
                    >
                      <FormControlLabel
                        value="asc"
                        control={<Radio />}
                        label="Ascending"
                      />
                      <FormControlLabel
                        value="desc"
                        control={<Radio />}
                        label="Descending"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Name :</FormLabel>
                    <RadioGroup
                      aria-label="Name"
                      name="name"
                      className={classes.group}
                      onChange={this.changeFilter}
                    >
                      <FormControlLabel
                        value="asc"
                        control={<Radio />}
                        label="Ascending"
                      />
                      <FormControlLabel
                        value="desc"
                        control={<Radio />}
                        label="Descending"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div
                style={{
                  width: '80%',
                  // border:"hsl(0,0%,80%) 1px solid",
                  padding: '25px',
                  minHeight: '500px',
                  backgroundColor: '#f1f1f1'
                }}
              >
                {this.state.inputSearch !== '' &&
                this.state.onSearch.length !== 0
                  ? this.state.onSearch.map(item => (
                      <ListTacit
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        date={item.datePublish}
                      />
                    ))
                  : this.state.tacit.map(item => (
                      <ListTacit
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        date={item.datePublish}
                      />
                    ))}
              </div>
            </div>
            <Pagination
              style={{
                margin: 'auto',
                marginBottom: '10px'
              }}
              size="large"
              limit={10}
              offset={this.state.offset}
              total={
                this.state.onSearch.length === 0
                  ? 10 * this.state.pages
                  : this.state.pages
              }
              onClick={(e, offset, page) => this.handleClick(offset, page)}
            />
          </Fragment>
        )}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(TacitPage);
