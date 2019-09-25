import React from 'react';

import Paper from '@material-ui/core/Paper';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

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
          value={props.type}
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
            disabled
            value="compound"
            control={<Radio />}
            label="Compound"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}

export default Step1;
