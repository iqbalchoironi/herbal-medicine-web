import React, { Component } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';

import Spinner from '../../components/Spinner/Spinner';
import { Paper } from '@material-ui/core';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import SearchInput from '../../components/search-input/SearchInput';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Location from '@material-ui/icons/LocationOn';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class EthnicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      onDisplay: [],
      plantEthnic: [],
      ethnic: [],
      detailEthnic: [],
      snackbar: {
        open: false,
        success: false,
        message: ''
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({
        loading: true
      });
      let url = '/jamu/api/ethnic/getlist';
      let res = await Axios.get(url);
      let { data } = await res;
      this.afterUpdate(data.success, data.message);
      this.setState({
        ethnic: data.data
      });
    } catch (err) {
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
    await this.getDataPlantEthnic();
  }

  // async componentWillReceiveProps(nextProps) {
  //   // this.setState({
  //   //   loading: true
  //   // });
  //   // await this.getDataPlantEthnic();
  // }

  async getDataPlantEthnic() {
    try {
      const { id } = this.props.match.params;
      const urlDetailEthnic = '/jamu/api/ethnic/get/' + id;

      const resDetailEthnic = await Axios.get(urlDetailEthnic);
      const DetailEthnic = await resDetailEthnic.data.data;
      let plantEthnic = resDetailEthnic.data.data.refPlantethnic;
      Promise.all(plantEthnic).then(completed => {
        var result = [];
        completed.forEach(item => {
          var name = item.disease_ina;
          if (!(name in result)) {
            result[name] = [];
            result[name].push(item);
          } else {
            result[name].push(item);
          }
        });
        this.afterUpdate(
          true,
          'load detail ethnic with plant use for herbal medicine success'
        );
        this.setState({
          detailEthnic: DetailEthnic,
          onDisplay: result,
          plantEthnic: result,
          loading: false
        });
      });
    } catch (err) {
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
  }

  handleSearch(e) {
    // this.setState({
    //     loading: true
    // })
    if (e.target.value === '') {
      this.setState({
        onDisplay: this.state.plantEthnic
      });
    } else {
      const regex = new RegExp(e.target.value, 'ig');
      let filter = [];
      Object.keys(this.state.plantEthnic).forEach((key, i) => {
        let name = key;
        this.state.plantEthnic[key].forEach(plantethnic => {
          if (plantethnic.name_ina.match(regex) !== null) {
            if (!(name in filter)) {
              filter[name] = [];
              filter[name].push(plantethnic);
            } else {
              filter[name].push(plantethnic);
            }
          }
        });
      });
      this.setState({
        onDisplay: filter,
        loading: false
      });
    }
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
    return (
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '20px'
            }}
          >
            <div
              style={{
                width: '90%',
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto'
              }}
            >
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Breadcrumbs aria-label="Breadcrumb">
                  <Typography color="textPrimary">KMS Jamu</Typography>
                  <Typography color="textPrimary">Ethnic</Typography>
                  <Typography color="textPrimary">
                    {this.state.detailEthnic.name}
                  </Typography>
                </Breadcrumbs>
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              >
                <SearchInput
                  nameInput="inputSearch"
                  inputChange={this.handleSearch}
                />
              </div>
            </div>
            {this.state.onEror ? (
              <ErorPage />
            ) : (
              <Paper
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: 'auto',
                  marginTop: '10px',
                  width: '90%',
                  padding: '15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <Paper
                  style={{
                    width: '30%',
                    marginRight: '10px'
                  }}
                >
                  <List>
                    {this.state.ethnic !== undefined &&
                      this.state.ethnic.map(itm => {
                        return (
                          // <li key={itm._id} id={itm._id} style={{
                          //   color:"grey",
                          //   fontSize:"14px"
                          // }}> <Link to={`/ethnic/${itm._id}`}>ethnic {itm.name}</Link></li>

                          <ListItemLink href={`/ethnic/${itm._id}`}>
                            <ListItemIcon>
                              <Location />
                            </ListItemIcon>
                            <ListItemText
                              style={{
                                padding: '5px'
                              }}
                              primary={`Ethnic ${itm.name}`}
                            />
                          </ListItemLink>
                        );
                      })}
                  </List>
                </Paper>
                <Paper
                  style={{
                    width: '70%',
                    padding: '25px'
                  }}
                >
                  {Object.keys(this.state.onDisplay).map((key, i) => {
                    return (
                      <div>
                        <Typography key={key} variant="title" gutterBottom>
                          {' '}
                          {key} :
                        </Typography>
                        <ul>
                          {this.state.onDisplay[key].map(plantethnic => {
                            return (
                              <ExpansionPanel>
                                <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  <Typography>
                                    {plantethnic.name_ina}{' '}
                                    {plantethnic.name_ina ? '|' : null}{' '}
                                    <i>{plantethnic.species}</i>
                                  </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                  }}
                                >
                                  <Typography variant="caption" gutterBottom>
                                    Name plant (in bahasa) :{' '}
                                    {plantethnic.name_ina}
                                  </Typography>
                                  <Typography variant="caption" gutterBottom>
                                    Efficacy (in bahasa) :{' '}
                                    {plantethnic.disease_ina}
                                  </Typography>
                                  <Typography variant="caption" gutterBottom>
                                    Efficacy (in english) :{' '}
                                    {plantethnic.disease_ing}
                                  </Typography>
                                  {/* <Typography variant="caption" gutterBottom>
                                    Species of plant :{" "}
                                    <i>{plantethnic.species}</i>
                                  </Typography> */}
                                  <Typography variant="caption" gutterBottom>
                                    Family of plant :{' '}
                                    <i>{plantethnic.family}</i>
                                  </Typography>
                                  <Typography variant="caption" gutterBottom>
                                    Part of plant used in therapeutic usage (in
                                    bahasa) : {plantethnic.section_ina}
                                  </Typography>
                                  <Typography variant="caption" gutterBottom>
                                    Part of plant used in therapeutic usage (in
                                    english) : {plantethnic.section_ing}
                                  </Typography>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                  <Button size="small" color="primary">
                                    Read More
                                  </Button>
                                </ExpansionPanelActions>
                              </ExpansionPanel>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </Paper>
              </Paper>
            )}
          </div>
        )}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

export default EthnicDetail;
