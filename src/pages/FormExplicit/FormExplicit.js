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
import Checkbox from '@material-ui/core/Checkbox';

import { FormControl, InputLabel, Input } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '90%',
    margin: 'auto',
    marginTop: '100px',
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

class FormExplicit extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  constructor(props) {
    super(props);
    // change code below this line
    this.state = {
      loading: true,
      activeStep: 0,
      skipped: new Set(),
      firstName: '',
      lastName: '',
      title: '',
      datePublish: '',
      citation: [],
      language: '',
      abstrak: '',
      description: '',
      file: null
    };
    // change code above this line
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.getData();
  }

  async getData() {
    const url = '/jamu/api/plant/getlist';
    const res = await Axios.get(url);
    const { data } = await res;
    let coba = [];
    data.data.forEach(plant => {
      coba.push(plant.sname);
    });
    this.setState({ itembasis: coba, item: data.data, loading: false });
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    event.preventDefault();
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  handleSubmit = event => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: user.token
      }
    };

    let url = '/jamu/api/explicit/create';
    const formData = new FormData();
    formData.append('doc', this.state.file);
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('title', this.state.title);
    formData.append('datePublish', this.state.datePublish);
    formData.append('citation', this.state.citation);
    formData.append('language', this.state.language);
    formData.append('abstract', this.state.abstrak);
    formData.append('description', this.state.description);
    Axios.post(url, formData, axiosConfig)
      .then(data => {
        const res = data.data;
        window.location.href = '/explicit';
      })
      .catch(err => {});
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const steps = [
      'Select campaign settings',
      'Create an ad group',
      'Result',
      'Result'
    ];
    const { activeStep } = this.state;

    return (
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
                      justifyContent: 'center',
                      width: '50%',
                      minHeight: '400px'
                    }}
                  >
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                  </Paper>
                </div>
                <div>
                  <Button onClick={this.handleReset} className={classes.button}>
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
                    activeStep={this.state.activeStep}
                    handleChange={this.handleChange}
                  />
                  <Step2
                    activeStep={this.state.activeStep}
                    handleChange={this.onChange}
                  />
                  <Step3
                    activeStep={this.state.activeStep}
                    handleChange={this.handleChange}
                  />

                  <Step4
                    activeStep={this.state.activeStep}
                    handleChange={this.handleChange}
                  />
                </div>
                <div
                  style={{
                    marginTop: '10px'
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>

                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Paper>
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
        width: '50%',
        minHeight: '400px'
      }}
    >
      <form style={{ width: '90%' }}>
        <div
          style={{
            display: 'flex'
          }}
        >
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">First Name</InputLabel>
            <Input
              style={{ marginRight: '15px' }}
              id="first-name"
              type="text"
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Title</InputLabel>
            <Input id="title" type="text" />
          </FormControl>
        </div>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Title</InputLabel>
          <Input id="title" type="text" />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Date Publish</InputLabel>
          <Input id="email" type="date" />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <FormLabel component="legend">Select approach :</FormLabel>
          <RadioGroup
            aria-label="Approach"
            name="type"
            onChange={props.handleChange}
          >
            <FormControlLabel value="crude" control={<Radio />} label="Crude" />
            <FormControlLabel
              value="molecul"
              control={<Radio />}
              label="Molecul"
            />
          </RadioGroup>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Message</InputLabel>
          <Input id="email" multiline rows={10} />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Message</InputLabel>
          <Input id="email" multiline rows={10} />
        </FormControl>
      </form>
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
        alignItems: 'center',
        width: '50%',
        minHeight: '400px'
      }}
    >
      <form style={{ width: '90%' }}>
        <FormControl margin="normal" fullWidth>
          <Button>
            <input type="file" />
          </Button>
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
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50%',
        minHeight: '400px',
        padding: '35px'
      }}
    >
      <Typography variant="body1" gutterBottom align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        tincidunt sem et scelerisque laoreet. Mauris non mattis sem. Donec
        auctor sem a iaculis pulvinar. Suspendisse id tortor nec erat congue
        volutpat eu a nisl. Nunc eleifend, ligula in egestas gravida, justo elit
        tincidunt risus, interdum porttitor sapien lectus ut orci. Cras quis
        massa non metus tincidunt gravida. Integer ac lacus sit amet augue
        ultrices sodales. Sed sodales sagittis sem sit amet egestas. Mauris
        elementum lacinia massa ut ullamcorper. Maecenas rutrum, sapien a
        imperdiet pharetra, orci lacus consequat purus, quis lobortis leo odio
        at felis. Sed nec lacinia mauris. Nam at vehicula nisl, ac blandit
        lacus. Vestibulum dui tortor, vulputate ac tempus nec, blandit sit amet
        mauris.Sed in dui elit. Cras laoreet ipsum at ornare maximus.
        Pellentesque tempus mi vitae dolor rutrum volutpat. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Phasellus ultricies leo sit amet ultricies viverra. Vivamus ullamcorper
        dui sit amet malesuada ultrices.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            // checked={this.state.checkedB}
            // onChange={this.handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label="Agree"
      />
    </Paper>
  );
}

function Step4(props) {
  if (props.activeStep !== 3) {
    return null;
  }
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        minHeight: '400px'
      }}
    >
      <h6> Sumarry</h6>
    </Paper>
  );
}
export default withStyles(styles)(FormExplicit);
