import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

import { FormControl, InputLabel } from '@material-ui/core';

import Picklist from '../../components/pick-list';
import Spinner from '../../components/Spinner/Spinner';

import { emphasize } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '70%',
    margin: 'auto',
    marginTop: '30px',
    marginBottom: '40px',
    padding: '10px'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

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

class Predict extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  constructor(props) {
    super(props);
    // change code below this line
    this.state = {
      loading: true,
      onPredic: false,
      activeStep: 0,
      skipped: new Set(),
      item: [],
      itembase: [],
      itembasis: [],
      itemtarget: [],
      type: '',
      model: '',
      target: [],
      optimization: '',
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      resultPredic: {},
      predictLoad: false
    };
    // change code above this line
    this.coba = this.coba.bind(this);
    this.coba1 = this.coba1.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const url = '/jamu/api/plant/getlist';
      const res = await Axios.get(url);
      const { data } = await res;
      let coba = [];
      console.log(data.data);
      data.data.forEach(plant => {
        coba.push(plant.sname);
      });

      const urlCompound = '/jamu/api/compound/getlist';
      const resCompound = await Axios.get(urlCompound);
      const dataCompound = await resCompound.data;
      let compound = [];
      dataCompound.data.forEach(dt => {
        compound.push(dt.cname);
      });

      this.afterUpdate(data.success, data.message);
      this.setState({
        basisPlant: coba,
        basisCompound: compound,
        itemPlant: data.data,
        itemCompound: dataCompound.data,
        loading: false
      });
    } catch (err) {
      console.log(err.message);
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
  }
  optionsArray = [
    {
      label: 'svm',
      value: 'svm'
    },
    {
      label: 'som',
      value: 'som'
    }
  ];

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    if (activeStep === 1) {
      let target = [];
      this.state.itemtarget.forEach(item => {
        this.state.item.forEach(i => {
          if (i.sname === item) {
            target.push(i);
          }
        });
      });
      this.setState({
        target: target
      });
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  coba(e) {
    this.setState({
      itemtarget: [...this.state.itemtarget, e.target.dataset.value],
      itembasis: this.state.itembasis.filter(
        data => data !== e.target.dataset.value
      ),
      itembase: this.state.itembase.filter(
        data => data !== e.target.dataset.value
      )
    });
  }

  coba1(e) {
    this.setState({
      itembasis: [...this.state.itembasis, e.target.dataset.value],
      itembase: [...this.state.itembase, e.target.dataset.value],
      itemtarget: this.state.itemtarget.filter(
        data => data !== e.target.dataset.value
      )
    });
  }

  async handleSearch(e) {
    if (e.target.value === '') {
      this.setState({
        itembasis: this.state.itembase
      });
    } else {
      const regex = new RegExp(e.target.value, 'ig');
      let filter = await this.state.itembase.filter(dt => {
        return dt.match(regex);
      });
      this.setState({
        itembasis: filter
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    if (name === 'type') {
      if (value === 'crude') {
        this.setState({
          itembasis: this.state.basisPlant,
          itembase: this.state.basisPlant,
          item: this.state.itemPlant,
          loading: false
        });
      } else if (value === 'compound') {
        this.setState({
          itembasis: this.state.basisCompound,
          itembase: this.state.basisCompound,
          item: this.state.itemCompound,
          loading: false
        });
      }
    }
    this.setState({
      [name]: value
    });
    console.log(this.state);
    event.preventDefault();
  };

  async handleSubmit(event) {
    this.setState({
      onPredic: true,
      predictLoad: true
    });
    console.log(this.state);
    let id = this.state.target.map(dt => dt.idplant);
    console.log(id);
    const url = '/jamu/api/user/secret';
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await Axios.get(
      url,
      {
        params: {
          type: this.state.type,
          optimization: this.state.optimization,
          model: this.state.model,
          id: id
        }
      },
      axiosConfig
    );
    const { data } = await res;

    this.setState({
      resultPredic: data.data
    });

    this.handleNext();
    this.setState({
      predictLoad: false
    });

    event.preventDefault();
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
    const steps = [
      'Select Type of Prediction',
      `Choose Method and ${this.state.type}`,
      'Sumarry'
    ];
    const { activeStep } = this.state;

    return (
      <div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              width: '100%'
            }}
          >
            <Paper
              style={{
                width: '90%',
                margin: 'auto',
                marginTop: '15px',
                marginBottom: '30px',
                padding: '10px',
                display: 'flex'
              }}
              elevation={1}
            >
              <div
                style={{
                  width: '50%'
                }}
              >
                <Typography>Predict Efficacy Herbal Medicine</Typography>
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              >
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
                  <StyledBreadcrumb component="a" href="#" label="Analisys" />
                  <StyledBreadcrumb
                    label="Prediction of herbal medicine efficacy"
                    deleteIcon={<ExpandMoreIcon />}
                  />
                </Breadcrumbs>
              </div>
            </Paper>
            <Paper className={classes.root} elevation={4}>
              <div>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const props = {};
                    const labelProps = {};
                    if (this.isStepSkipped(index)) {
                      props.completed = false;
                    }
                    return (
                      <Step key={label} {...props}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Paper
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '60%',
                            minHeight: '400px',
                            padding: '10px'
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            The Prediction results is{' '}
                            {this.state.resultPredic.class}
                          </Typography>
                          <Typography
                            variant="overline"
                            display="block"
                            align="justify"
                            gutterBottom
                          >
                            Description :
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            align="justify"
                            gutterBottom
                          >
                            {this.state.resultPredic.description}
                          </Typography>
                          <Typography
                            variant="overline"
                            display="block"
                            align="justify"
                            gutterBottom
                          >
                            Disease :
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            align="justify"
                            gutterBottom
                          >
                            {this.state.resultPredic.diseases}
                          </Typography>
                        </Paper>
                      </div>
                      <div>
                        <Button
                          onClick={this.handleReset}
                          className={classes.button}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Step1
                          type={this.state.type}
                          activeStep={this.state.activeStep}
                          handleChange={this.handleChange}
                        />
                        <Step2
                          activeStep={this.state.activeStep}
                          handleChange={this.handleChange}
                          model={this.state.model}
                          options={this.optionsArray}
                          basis={this.state.itembasis}
                          target={this.state.itemtarget}
                          coba1={this.coba1}
                          coba={this.coba}
                          type={this.state.type}
                          filterList={this.handleSearch}
                        />
                        <Step3
                          activeStep={this.state.activeStep}
                          type={this.state.type}
                          model={this.state.model}
                          target={this.state.target}
                          onSubmit={this.onSubmit}
                          loadPredict={this.state.predictLoad}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: '10px',
                          display: 'flex',
                          flexDirection: 'row-reverse'
                        }}
                      >
                        {activeStep === 0 ? (
                          <Button
                            disabled={this.state.type === ''}
                            variant="raised"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            Next
                          </Button>
                        ) : activeStep === 1 ? (
                          <Button
                            disabled={
                              this.state.model === '' ||
                              this.state.optimization === '' ||
                              this.state.itemtarget.length === 0
                            }
                            variant="raised"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            variant="raised"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                          >
                            Submit
                          </Button>
                        )}
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          </div>
        )}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

function Step1(props) {
  if (props.activeStep !== 0) {
    return null;
  }
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        minHeight: '400px',
        backgroundColor: '#f8f8f8'
      }}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Select approach :</FormLabel>
        <RadioGroup
          aria-label="Approach"
          name="type"
          onChange={props.handleChange}
        >
          <FormControlLabel
            value="crude"
            control={<Radio />}
            label="Crude Drug"
          />
          <FormControlLabel
            value="compound"
            control={<Radio />}
            label="Compound"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}

function Step2(props) {
  if (props.activeStep !== 1) {
    return null;
  }
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '70%',
        minHeight: '400px',
        backgroundColor: '#f8f8f8'
      }}
    >
      <form style={{ width: '90%' }}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="model">Model </InputLabel>
          <Select
            native
            name="model"
            value={props.model}
            onChange={props.handleChange}
            inputProps={{
              id: 'age-native-simple'
            }}
          >
            <option value="" />
            <option value={'svm'}>suport vector mechine</option>
            <option value={'rf'}>random forest</option>
            <option value={'dl'}>deep learning</option>
          </Select>
        </FormControl>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Using optimization :</FormLabel>
          <RadioGroup
            aria-label="Using optimization"
            name="optimization"
            onChange={props.handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="yes" />
            <FormControlLabel value="0" control={<Radio />} label="no" />
          </RadioGroup>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <label>Select {props.type} :</label>
          <Picklist
            basis={props.basis}
            target={props.target}
            coba1={props.coba1}
            coba={props.coba}
            filterList={props.filterList}
          />
        </FormControl>
      </form>
    </Paper>
  );
}

function Step3(props) {
  if (props.activeStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      {props.loadPredict ? (
        <Paper
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '50%',
            minHeight: '400px',
            backgroundColor: '#f8f8f8'
          }}
        >
          <Typography>loading...</Typography>
        </Paper>
      ) : (
        <Paper
          style={{
            display: 'flex',
            //justifyContent: "center",
            alignItems: 'center',
            flexDirection: 'column',
            width: '50%',
            minHeight: '400px'
          }}
        >
          <h3>Summary</h3>
          <Paper
            style={{
              padding: '20px',
              backgroundColor: '#f8f8f8'
            }}
          >
            <table>
              <tr>
                <td>Type of Prediction</td>
                <td>:</td>
                <td>
                  <span>{props.type}</span>
                </td>
              </tr>
              <tr>
                <td>Type of Method</td>
                <td>:</td>
                <td>
                  <span>{props.model}</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    verticalAlign: 'top'
                  }}
                >{`Selected ${props.type}`}</td>
                <td
                  style={{
                    verticalAlign: 'top'
                  }}
                >
                  :
                </td>
                <td
                  style={{
                    verticalAlign: 'top'
                  }}
                >
                  <ul
                    style={{
                      margin: 0,
                      marginLeft: 5,
                      padding: 0,
                      paddingLeft: 12
                    }}
                  >
                    {props.target.map(dt => (
                      <li>{dt.sname}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </table>
          </Paper>
          {/* <div
            style={{
              width: "80%"
            }}
          >
            <h3> Sumarry :</h3>
          </div>

          <label>Type of Prediction :</label>
          <span>{props.type}</span>
          <label>Type of Method :</label>
          <span>{props.model}</span>
          <label>{`Selected ${props.type} :`}</label>
          <ul>
            {props.target.map(dt => (
              <li>{dt.sname}</li>
            ))}
          </ul> */}
        </Paper>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(Predict);
