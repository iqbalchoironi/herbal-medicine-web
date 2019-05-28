import React, {Component} from 'react';
import Axios from 'axios'
import FileDownload from 'js-file-download'
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper'
import SaveAlt from '@material-ui/icons/SaveAlt';
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class DetailHerbMed extends Component {
  state = {
    value: 0,
    show : null,
    loading: false
  }

  async componentDidMount(){
    const {id} = this.props.match.params;
    const url = '/jamu/api/explicit/get/' + id;
    const res = await Axios.get(url);
    const { data } = await res;
    this.setState({
      show: data.data,
      loading: false
    })
  }

//   getFile (e){
//     console.log(e.target.dataset.value)
//     let doc = e.target.dataset.value
//     Axios.get('/jamu/api/explicit/file/`+e.target.dataset.value)
//    .then((response) => {
//         FileDownload(response.data, doc);
//    });
//   }

    handleChange = (event, value) => {
        this.setState({ value });
    };

  render(){
    const { value } = this.state;
    if (this.state.loading) {
      return <div><br></br><br></br> <br></br>loading...</div>;
    }
    return(
        <Paper style={{
            width:"90%",
            margin:"auto",
            marginTop: "80px",
            marginBottom: "10px",
            padding: "30px"
          }}>
          <Paper style={{
            width:"90%",
            margin:"auto",
            marginTop: "20px",
            marginBottom: "10px",
            padding: "30px"
          }}>
            <Typography variant="headline" gutterBottom>
                Title
            </Typography>
                <Typography variant="caption" gutterBottom>
                <Person /> Person
                </Typography >
                <Typography variant="caption" gutterBottom>
                <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
                </Typography>
            </Paper>
           <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            >
                <Tab label="Plant" />
                <Tab label="Crude Drug" />
                <Tab label="Compound" />
            </Tabs>
            <Paper style={{
                width:"90%",
                margin:"auto",
                marginTop: "20px",
                marginBottom: "10px",
                padding: "30px"
            }}>
            {value === 0 && 
            <TabContainer>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </TabContainer>}
            {value === 1 && <TabContainer>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </TabContainer>}
            {value === 2 && <TabContainer>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        item
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </TabContainer>}
            </Paper>
        </Paper>
    );
  }
}

export default DetailHerbMed;