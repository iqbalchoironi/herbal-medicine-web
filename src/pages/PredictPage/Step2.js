import React from 'react';

import {
  Paper,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import Picklist from '../../components/pick-list';

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
            <option value={'svm'}>Support Vector Machine</option>
            <option value={'rf'}>Random Forest</option>
            <option value={'dl'}>Deep Learning</option>
          </Select>
        </FormControl>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Using optimization :</FormLabel>
          <RadioGroup
            value={props.optimization}
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
            toBasis={props.toBasis}
            toTarget={props.toTarget}
            filterList={props.filterList}
          />
        </FormControl>
      </form>
    </Paper>
  );
}

export default Step2;
