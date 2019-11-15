import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';
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
      optimization: '1',
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      resultPredic: {},
      predictLoad: false
    };
    this.toTarget = this.toTarget.bind(this);
    this.toBasis = this.toBasis.bind(this);
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
      activeStep: 0,
      optimization: '',
      type: '',
      model: '',
      target: [],
      itembasis: this.state.itembase,
      itemtarget: []
    });
  };

  toTarget(e) {
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

  toBasis(e) {
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
    event.preventDefault();
  };

  async handleSubmit(event) {
    this.setState({
      onPredic: true,
      predictLoad: true
    });
    let id = this.state.target.map(dt => dt.idplant);
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
                <Typography>Prediction of Therapeutic Usage</Typography>
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
                    label="Prediction of Therapeutic Usage"
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
                          optimization={this.state.optimization}
                          options={this.optionsArray}
                          basis={this.state.itembasis}
                          target={this.state.itemtarget}
                          toBasis={this.toBasis}
                          toTarget={this.toTarget}
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

export default withStyles(styles)(Predict);
