import React, { Component } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

import ModalCrude from './ModalCrude';

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
    // const { id } = this.props.match.params;
    const idCompound = '5d3ac7c51e6c5f6fda0a0b22';
    const url = '/jamu/api/compound/get/' + idCompound;
    const res = await Axios.get(url);
    const { data } = await res;
    const id = '22179';
    this.setState({
      compound: data.data,
      id: id
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
            <Typography>Detail Name Compound</Typography>
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
                label="Name Compound"
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
                Name compound : {this.state.compound.cname}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Effect compound: {this.state.compound.effect_compound}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Effect part : {this.state.compound.effect_part}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Effect plant: {this.state.compound.effect_plant}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Plant Species : <i>{this.state.compound.plant_species}</i>
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Part : {this.state.compound.part}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Part plant : {this.state.compound.part_plant}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Reference : {this.state.compound.reff_metabolites}
              </Typography>
            </Paper>
          </div>

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
                src={
                  'https://pubchem.ncbi.nlm.nih.gov/compound/22179#section=3D-Conformer&embed=true&hide_title=true'
                }
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
                src={
                  'https://pubchem.ncbi.nlm.nih.gov/compound/22179#section=2D-Structure&embed=true&hide_title=true'
                }
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
                src={
                  'https://pubchem.ncbi.nlm.nih.gov/compound/22179#section=Chemical-and-Physical-Properties&embed=true&hide_title=true'
                }
                style={{
                  border: '0',
                  height: '920px',
                  width: '100%'
                }}
              ></iframe>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailCompound);
