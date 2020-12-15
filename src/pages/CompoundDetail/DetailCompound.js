import React, { Component } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

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

const styles = theme => ({
  avatar: {
    background: 'none',
    marginRight: -theme.spacing(1.5)
  }
});

class DetailCompound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      compound: {}
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const url = '/jamu/api/compound/get/' + id;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      compound: data.data
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper
          style={{
            width: '90%',
            margin: 'auto',
            marginTop: '15px',
            marginBottom: '5px',
            padding: '15px',
            display: 'flex'
          }}
          elevation={1}
        >
          <div
            style={{
              width: '50%'
            }}
          >
            <Typography>Detail {this.state.compound.cname}</Typography>
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
              <StyledBreadcrumb component="a" href="#" label="Compound  " />
              <StyledBreadcrumb
                label={this.state.compound.cname}
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </div>
        </Paper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            width: '95%',
            marginBottom: '10px'
          }}
        >
          <div
            style={{
              width: '30%',
              padding: '30px'
            }}
          >
            <Paper
              style={{
                width: '100%',
                padding: '10px'
                //border: "5px dotted #89b143"
              }}
            >
              <Typography variant="caption" display="block" gutterBottom>
                Compond Id : {this.state.compound.compound_id}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Name compound : {this.state.compound.cname}
              </Typography>
              <label
                style={{
                  color: 'grey',
                  fontWeight: 'lighter',
                  fontSize: '13px',
                  display: 'block',
                  marginTop: '10px',
                  marginBottom: '5px'
                }}
              >
                Reference Plant :
              </label>
              {this.state.compound.refPlant &&
                this.state.compound.refPlant.map(itm => {
                  return (
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                          {' '}
                          <i>{itm.sname}</i>
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        style={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <img
                          style={{
                            verticalAlign: 'middle',
                            borderStyle: 'none',
                            maxHeight: '250px',
                            width: '250px'
                          }}
                          alt=""
                          className="img-card"
                          src={itm.refimg}
                        ></img>
                        <Typography variant="caption" gutterBottom>
                          ID plant : <i>{itm.idplant}</i>
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Saintifict name : <i>{itm.sname}</i>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}

              <label
                style={{
                  color: 'grey',
                  fontWeight: 'lighter',
                  fontSize: '13px',
                  display: 'block',
                  marginTop: '10px',
                  marginBottom: '5px'
                }}
              >
                Reference Crude :
              </label>

              {this.state.compound.refCrudeCompound &&
                this.state.compound.refCrudeCompound.map(itm => {
                  return (
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                          {' '}
                          <i>{itm.plant_species}</i>
                        </Typography>
                      </ExpansionPanelSummary>

                      <ExpansionPanelDetails
                        style={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Typography variant="caption" gutterBottom>
                          Plant pecies :{' '}
                          {itm.plant_species ? itm.plant_species : '-'}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Part : {itm.part ? itm.part : '-'}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Part of plant :{' '}
                          {itm.part_of_plant ? itm.part_of_plant : '-'}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Effect plant :{' '}
                          {itm.effect_plant ? itm.effect_plant : '-'}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Effect part :{' '}
                          {itm.effect_part ? itm.effect_part : '-'}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Referece metabolites :{' '}
                          {itm.ref_metabolites ? itm.ref_metabolites : '-'}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
            </Paper>
          </div>

          {this.state.compound.pubchem_ID !== null ? (
            <div
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                width: '80%'
              }}
            >
              <Paper
                style={{
                  marginBottom: '20px'
                }}
              >
                <iframe
                  title="3d"
                  src={`https://pubchem.ncbi.nlm.nih.gov/compound/${this.state.compound.pubchem_ID}#section=3D-Conformer&embed=true&hide_title=true`}
                  style={{
                    border: '0',
                    height: '525px',
                    width: '100%'
                  }}
                ></iframe>
              </Paper>

              <Paper
                style={{
                  marginBottom: '20px'
                }}
              >
                <iframe
                  title="2d"
                  src={`https://pubchem.ncbi.nlm.nih.gov/compound/${this.state.compound.pubchem_ID}#section=2D-Structure&embed=true&hide_title=true`}
                  style={{
                    border: '0',
                    height: '525px',
                    width: '100%'
                  }}
                ></iframe>
              </Paper>

              <Paper
                style={{
                  marginBottom: '20px'
                }}
              >
                <iframe
                  title="property"
                  src={`https://pubchem.ncbi.nlm.nih.gov/compound/${this.state.compound.pubchem_ID}#section=Chemical-and-Physical-Properties&embed=true&hide_title=true`}
                  style={{
                    border: '0',
                    height: '920px',
                    width: '100%'
                  }}
                ></iframe>
              </Paper>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailCompound);
