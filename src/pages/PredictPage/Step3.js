import React from 'react';

import { Paper, Typography } from '@material-ui/core';

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
        </Paper>
      )}
    </React.Fragment>
  );
}

export default Step3;
