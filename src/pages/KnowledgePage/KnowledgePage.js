import React, { Component, Fragment } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Spinner from '../../components/Spinner/Spinner';

import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import DateRange from '@material-ui/icons/DateRange';
import Pagination from 'material-ui-flat-pagination';

import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

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

import Icon from '@material-ui/core/Icon';

import { emphasize } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
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

function ListExplicit(props) {
  return (
    <div
      style={{
        marginTop: '0',
        marginBottom: '26px',
        maxWidth: '95%'
      }}
    >
      <h1
        style={{
          color: '#0071bc',
          fontWeight: '500',
          fontSize: '1.5em'
        }}
      >
        {/* <Link style={{ 
          textDecoration: 'none'
          }} to={`/explicit/${ props.id }`}>
            {props.title}
        </Link> */}
        {props.title}
      </h1>
      <Typography variant="caption">
        <Person /> {props.name}
      </Typography>
      <Typography variant="caption">
        <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
      </Typography>
      <p className="block-with-text">{props.abstract}</p>
      <Button href={`/explicit/${props.id}`}>
        Read More <Icon>chevron_right_rounded</Icon>
      </Button>
      <Divider light />
    </div>
  );
}

class KnowledgePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadData: false,
      onSearch: [],
      explicit: [],
      currentPage: 1,
      offset: 5,
      pages: null,
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      inputSearch: '',
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
    window.addEventListener('scroll', this.ok, false);
    this.getData();
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.getDataSearch(event);
    }
  }

  async handleClick(offset, page) {
    await this.setState({ currentPage: page, offset });
    this.getData();
  }

  async getData() {
    try {
      const url = '/jamu/api/explicit/pages/' + this.state.currentPage;
      const res = await Axios.get(url);
      const { data } = await res;
      this.afterUpdate(data.success, data.message);
      this.setState({
        pages: data.pages,
        explicit: data.data,
        loading: false
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
    window.location.href = '/form/explicit';
  };

  async getDataSearch() {
    if (this.state.inputSearch === '') {
      window.location.href = '/knowledge';
    } else {
      this.setState({
        loadData: true
      });
      const url = '/jamu/api/explicit/search/sort';
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
    const url = '/jamu/api/explicit/search/sort';
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
        explicit: newData,
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
                      {/* <StyledBreadcrumb
                        label="Explicit Knowledge"
                        deleteIcon={<ExpandMoreIcon />}
                      /> */}
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
                {/* <StyledBreadcrumb
                  label="Explicit Knowledge"
                  deleteIcon={<ExpandMoreIcon />}
                /> */}
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
                //border:"hsl(0,0%,80%) 1px solid",
                width: '95%',
                marginTop: '10px',
                marginBottom: '10px'
              }}
            >
              <div
                style={{
                  width: '20%'
                  //position: "fixed"
                  //border:"hsl(0,0%,80%) 1px solid"
                }}
              >
                <div
                  style={{
                    width: '20%'
                    //position: "fixed"
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
                  //border:"hsl(0,0%,80%) 1px solid",
                  padding: '25px',
                  minHeight: '500px',
                  backgroundColor: '#f1f1f1'
                }}
              >
                {this.state.inputSearch !== '' &&
                this.state.onSearch.length !== 0
                  ? this.state.onSearch.map(item => (
                      <ListExplicit
                        key={item._id}
                        id={item._id}
                        name={item.firstName + ' ' + item.lastName}
                        title={item.title}
                        abstract={item.abstract}
                      />
                    ))
                  : this.state.explicit.map(item => (
                      <ListExplicit
                        key={item._id}
                        id={item._id}
                        name={item.firstName + ' ' + item.lastName}
                        title={item.title}
                        abstract={item.abstract}
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

export default withStyles(styles)(KnowledgePage);
