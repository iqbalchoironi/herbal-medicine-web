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

import Card from '../../components/card-plant/card';
import Spinner from '../../components/Spinner/Spinner';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

import ModalCrude from '../../components/modal-crude/ModalCrude';
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

class DetailHerbMed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      detailHerbMed: [],
      loading: false,
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      modal: {
        open: false,
        id: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);

    this.modalCrude = this.modalCrude.bind(this);
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
      const url = '/jamu/api/herbsmed/get/' + id;
      const res = await Axios.get(url);
      const { data } = await res;
      let RefCrude = await Promise.all(
        data.data.refCrude.map(async dt => {
          let urlCrude = '/jamu/api/crudedrug/get/' + dt.idcrude;
          let resCrude = await Axios.get(urlCrude);
          let { data } = await resCrude;
          return data.data;
        })
      );

      let Plant = RefCrude.map(dt => dt.refPlant[0]);
      Plant = await Promise.all(
        Array.from(
          new Set(
            Plant.filter(dt => {
              if (dt !== null || dt !== undefined) {
                return dt;
              }
              return 0;
            }).map(dt => {
              return dt.idplant;
            })
          )
        ).map(async id => {
          let urlPlant = '/jamu/api/plant/get/' + id;
          let resPlant = await Axios.get(urlPlant);
          let { data } = await resPlant;
          return data.data;
        })
      );
      let detailHerbMed = data.data;
      detailHerbMed.refCrude = RefCrude;
      detailHerbMed.refPlant = Plant;
      this.afterUpdate(data.success, data.message);
      this.setState({
        detailHerbMed: detailHerbMed,
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

  async modalCrude(id) {
    this.setState({
      modal: {
        open: true,
        id: id
      }
    });
  }

  closeBtn() {
    this.setState({
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      modal: {
        open: false
      }
    });
  }

  render() {
    const { classes } = this.props;
    let { refCompany } = this.state.detailHerbMed;
    let { refDclass } = this.state.detailHerbMed;
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
                <Typography>Detail {this.state.detailHerbMed.name}</Typography>
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
                  <StyledBreadcrumb
                    component="a"
                    href="#"
                    label="Herbal Medicine"
                  />
                  <StyledBreadcrumb
                    label={this.state.detailHerbMed.name}
                    deleteIcon={<ExpandMoreIcon />}
                  />
                </Breadcrumbs>
              </div>
            </Paper>
            <Paper
              style={{
                width: '85%',
                margin: 'auto',
                marginTop: '30px',
                marginBottom: '10px',
                padding: '30px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
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
                <Typography variant="h6" gutterBottom>
                  {this.state.detailHerbMed.name}
                </Typography>
                <h6
                  style={{
                    margin: '0',
                    color: 'grey'
                  }}
                >
                  Company :
                </h6>
                <Typography
                  style={{ marginLeft: '10px' }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {refCompany ? refCompany.cname : null}
                </Typography>
                <h6
                  style={{
                    margin: '0',
                    color: 'grey'
                  }}
                >
                  Address company :
                </h6>
                <Typography
                  style={{ marginLeft: '10px' }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {refCompany ? refCompany.address : null}
                </Typography>
                <h6
                  style={{
                    margin: '0',
                    color: 'grey'
                  }}
                >
                  Efficacy :
                </h6>
                <Typography
                  style={{ marginLeft: '10px' }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {this.state.detailHerbMed.efficacy}
                </Typography>
                <h6
                  style={{
                    margin: '0',
                    color: 'grey'
                  }}
                >
                  Disease class description :
                </h6>
                <Typography
                  style={{ marginLeft: '10px' }}
                  variant="caption"
                  display="block"
                  align="justify"
                  gutterBottom
                >
                  {refDclass ? refDclass.description : null}
                </Typography>
                <h6
                  style={{
                    margin: '0',
                    color: 'grey'
                  }}
                >
                  Reference :
                </h6>
                <Typography
                  style={{ marginLeft: '10px' }}
                  variant="caption"
                  display="block"
                  align="justify"
                  gutterBottom
                >
                  {this.state.detailHerbMed.ref
                    ? this.state.detailHerbMed.ref
                    : null}
                </Typography>
              </Paper>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Crude in this formula" />
                <Tab label="Plant" />

                {/* <Tab label="Compound" /> */}
              </Tabs>
              <Paper
                style={{
                  width: '90%',
                  margin: 'auto',
                  marginTop: '20px',
                  marginBottom: '10px',
                  padding: '30px'
                }}
              >
                {this.state.value === 1 && (
                  <TabContainer>
                    {this.state.detailHerbMed.refPlant !== undefined && (
                      <div className="for-card">
                        {this.state.detailHerbMed.refPlant.map(item => (
                          <Card
                            key={item.id}
                            id={item.idplant}
                            name={item.sname}
                            image={item.refimg}
                            reff={item.refCrude}
                            modalCrude={this.modalCrude}
                          />
                        ))}
                      </div>
                    )}
                  </TabContainer>
                )}
                {this.state.value === 0 && (
                  <TabContainer>
                    {this.state.detailHerbMed.refCrude !== undefined &&
                      this.state.detailHerbMed.refCrude.map(itm => {
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
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Saintifict Name : <i>{itm.sname}</i>
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Name (in english) : {itm.name_en}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Local name I : {itm.name_loc1}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Local name II : <i>{itm.name_loc2}</i>
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Global Name : <i>{itm.gname}</i>
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Effect : {itm.effect}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Location Effect : {itm.effect_loc}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Refrence : {itm.ref}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        );
                      })}
                  </TabContainer>
                )}
                {/* {this.state.value === 2 && (
                  <TabContainer>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Name</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>item</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Name</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>item</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Name</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>item</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </TabContainer>
                )} */}
              </Paper>
            </Paper>
          </div>
        )}
        {this.state.modal.open === true ? (
          <ModalCrude modal={this.state.modal} close={this.closeBtn} />
        ) : null}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailHerbMed);
