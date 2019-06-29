import React, {Component} from 'react';
import Axios from 'axios'
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper'
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Typography from '@material-ui/core/Typography';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CardExample from './card'
import Spinner from './Spinner'

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
    constructor(props) {
        super(props);
           this.state = {
                value: 0,
                detailHerbMed : [],
                loading: false
            }
        this.handleChange = this.handleChange.bind(this)
        }

        async componentDidMount(){
            this.setState({
                loading:true
            })
            await this.getData()
          }

          async getData(){
            const {id} = this.props.match.params;
            const url = '/jamu/api/herbsmed/get/' + id;
            const res = await Axios.get(url);
            const { data } = await res;
            let RefCrude = await  Promise.all(data.data.refCrude.map(async dt => {
                let urlCrude = '/jamu/api/crudedrug/get/' + dt.idcrude
                let resCrude = await Axios.get(urlCrude);
                let { data } = await resCrude;
                return data.data
            }))

            let Plant = RefCrude.map(dt => dt.refPlant[0])
            console.log(Plant)
            Plant = await Promise.all(Array.from(new Set(Plant.filter(dt => dt !== null).map( dt =>{
                    return dt.idplant
            } )))
                    .map( async id => {
                        let urlPlant = '/jamu/api/plant/get/'+id;
                        let resPlant = await Axios.get(urlPlant)
                        let { data } = await resPlant
                        return data.data
                    }))
            let detailHerbMed = data.data
            detailHerbMed.refCrude = RefCrude
            detailHerbMed.refPlant = Plant
            console.log(detailHerbMed)
            this.setState({
              detailHerbMed: detailHerbMed,
              loading: false
            })
          }
        
          handleChange = (event, value) => {
            this.setState({ value });
          };

  render(){
    return(
        <div>
            {this.state.loading ? 
                <Spinner />
                :
                <div>
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
                            {this.state.detailHerbMed.name}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            {this.state.detailHerbMed.efficacy}
                        </Typography >
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
                    {this.state.value === 0 && 
                    <TabContainer>
                        {this.state.detailHerbMed.refPlant !== undefined &&
                        <div className="for-card">
                        {this.state.detailHerbMed.refPlant.map(item =>
                                  <CardExample key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                                )}
                        </div>
                        }
                        
                    </TabContainer>}
                    {this.state.value === 1 && 
                    <TabContainer>
                    {this.state.detailHerbMed.refCrude !== undefined &&
                    this.state.detailHerbMed.refCrude.map( itm =>{
                        return(
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >{itm.sname}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}>
                                    <Typography variant="title" gutterBottom>
                                        {itm.name_en}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {itm.gname}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {itm.position}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {itm.effect}
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })
                    }
                    
                </TabContainer>}
                    {this.state.value === 2 && <TabContainer>
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
            </div>
            }
        </div>
    )
  }
}

export default DetailHerbMed;