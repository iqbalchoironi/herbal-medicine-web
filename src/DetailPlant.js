import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Spinner from './Spinner';

import SnackBar from './SnackBar';
import ErorPage from './ErorPage';

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
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class DetailPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      detailPlant: [],
      loading: false,
      snackbar: {
        open: false,
        success: false,
        message: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    await this.getData();
  }

  async getData() {
    try {
      const { id } = this.props.match.params;
      const url = '/jamu/api/plant/get/' + id;
      const res = await Axios.get(url);
      const { data } = await res;
      // const urlDesc = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles='+ data.data.sname;
      // const resDesc = await Axios.get(urlDesc,{ headers: {'Access-Control-Allow-Origin': "*"} });
      // console.log(resDesc)
      let RefCrude = await Promise.all(
        data.data.refCrude.map(async dt => {
          let urlCrude = '/jamu/api/crudedrug/get/' + dt.idcrude;
          let resCrude = await Axios.get(urlCrude);
          let { data } = await resCrude;
          return data.data;
        })
      );

      let detailPlant = data.data;
      detailPlant.refCrude = RefCrude;
      console.log(detailPlant);
      this.afterUpdate(data.success, data.message);
      this.setState({
        detailPlant: detailPlant,
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

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
      <div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <Paper
              style={{
                width: '90%',
                margin: 'auto',
                marginTop: '15px',
                marginBottom: '30px',
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
                <Typography>
                  Detail Plant {this.state.detailPlant.sname}
                </Typography>
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
                  <StyledBreadcrumb component="a" href="#" label="Plant" />
                  <StyledBreadcrumb
                    label={this.state.detailPlant.sname}
                    deleteIcon={<ExpandMoreIcon />}
                  />
                </Breadcrumbs>
              </div>
            </Paper>
            <Paper
              style={{
                width: '80%',
                margin: 'auto',
                marginTop: '30px',
                marginBottom: '30px',
                padding: '30px',
                backgroundColor: '#f8f8f8'
              }}
            >
              <Paper
                style={{
                  width: '90%',
                  margin: 'auto',
                  marginTop: '20px',
                  marginBottom: '10px',
                  padding: '30px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div
                    style={{
                      marginRight: '20px'
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
                      src={this.state.detailPlant.refimg}
                    ></img>
                  </div>
                  <div>
                    <Typography
                      style={{
                        color: 'grey',
                        fontSize: '30px'
                      }}
                      variant="headline"
                      gutterBottom
                    >
                      <i>{this.state.detailPlant.sname}</i>
                    </Typography>
                  </div>
                </div>
              </Paper>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Crude Drug" />
                <Tab label="Compound" />
                <Tab label="Crude Use by Ethnic" />
              </Tabs>
              <Paper
                style={{
                  width: '90%',
                  minHeight: '300px',
                  maxHeight: '400px',
                  overflow: 'auto',
                  margin: 'auto',
                  marginTop: '20px',
                  marginBottom: '10px',
                  padding: '30px'
                }}
              >
                {/* {this.state.value === 0 && 
                    <TabContainer>
                        {this.state.detailPlant.refPlant !== undefined &&
                        <div className="for-card">
                        {this.state.detailPlant.refPlant.map(item =>
                                  <CardExample key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                                )}
                        </div>
                        }
                        
                    </TabContainer>} */}
                {this.state.value === 0 && (
                  <TabContainer>
                    {this.state.detailPlant.refCrude !== undefined &&
                      this.state.detailPlant.refCrude.map(itm => {
                        return (
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
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
                              <Typography variant="title" gutterBottom>
                                {itm.name_en}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                name_loc1 : {itm.name_loc1}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                name_loc2 : {itm.name_loc2}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                gname : {itm.gname}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                position : {itm.position}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                effect : {itm.position}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                effect_loc : {itm.effect}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                reff : {itm.reff}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        );
                      })}
                  </TabContainer>
                )}
                {this.state.value === 1 && (
                  <TabContainer>
                    {this.state.detailPlant.refCompound !== undefined &&
                      this.state.detailPlant.refCompound.map(itm => {
                        return (
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>
                                {' '}
                                <i>{itm.cname}</i>
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <Typography variant="caption" gutterBottom>
                                part_plant : {itm.part_plant}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                part : {itm.part}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                effect_plant : {itm.effect_plant}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                effect_part : {itm.effect_part}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                effect_compound : {itm.effect_compound}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                reff_metabolites : {itm.reff_metabolites}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                reff_addtional : {itm.reff_addtional}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        );
                      })}
                  </TabContainer>
                )}
                {this.state.value === 2 && (
                  <TabContainer>
                    {this.state.detailPlant.refEthnic !== undefined &&
                      this.state.detailPlant.refEthnic.map(itm => {
                        return (
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>
                                {' '}
                                <i>
                                  {itm.ethnic} | {itm.disease_ing}
                                </i>
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <Typography variant="caption" gutterBottom>
                                disease_ina : {itm.disease_ina}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                disease_ing : {itm.disease_ing}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                name_ina : {itm.name_ina}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                species : {itm.species}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                family : {itm.family}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                section_ina : {itm.section_ina}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                section_ing : {itm.section_ing}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        );
                      })}
                  </TabContainer>
                )}
              </Paper>
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

export default withStyles(styles, { withTheme: true })(DetailPlant);
