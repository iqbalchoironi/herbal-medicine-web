import React, { Component } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Spinner from './Spinner'

class EthnicDetai extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            onDisplay: [],
            plantethnic: []
        }
      }
    
      async componentDidMount() {
        this.setState({
          loading:true
      })
        await this.getDataPlantEthnic();
      }

      async getDataPlantEthnic(){
        const {id} = this.props.match.params;
        const urlDetailEthnic = '/jamu/api/ethnic/get/' + id
        
        const resDetailEthnic = await Axios.get(urlDetailEthnic);
        let plantEthnic = resDetailEthnic.data.data.refPlantethnic.map( async id => {
          let urlPlant = '/jamu/api/plantethnic/get/'+id
          let resPlant = await Axios.get(urlPlant);
          return resPlant.data.data;
        })
        Promise.all(plantEthnic).then((completed) => {
          var result = [];
          completed.forEach(item => {
            var name = item.disease_ina;
            if (!(name in result)) {
              result[name] = [];
              result[name].push(item);
            } else {
              result[name].push(item);
            }
          })
          this.setState({
            onDisplay: result,
            loading: false
          })
        })
      }

    render(){
        return (
          <div>
            {this.state.loading ? 
                <Spinner />
                :
            <div style={{
                display:"flex",
                flexDirection:"row",
                margin:"auto",
                border:"1px solid black",
                marginTop: "100px",
                width:"90%",
                padding: "15px"
            }}>
                <div style={{
                    width:"20%",
                    border:"1px solid black",
                    height:"350px",
                    marginRight: "10px"
                }}> 

                </div>
                <div style={{
                    width:"70%",
                    border:"1px solid black",
                    padding:"25px"
                }}>
                { Object.keys(this.state.onDisplay).map((key, i) => { 
                    return <div>
                    <Typography key={key} variant="title" gutterBottom> {key} :</Typography>
                        <ul>
                        {this.state.onDisplay[key].map((plantethnic) => {
                            return (
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{plantethnic.name_ina}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails style={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}>
                                        <Typography variant="caption" gutterBottom>{plantethnic.name_ina}</Typography> 
                                        <Typography variant="caption" gutterBottom>{plantethnic.disease_ina}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.disease_ing}</Typography> 
                                        <Typography variant="caption" gutterBottom>{plantethnic.species}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.family}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.section_ina}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.section_ing}</Typography>
                                        
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                        </ul>
                    </div>
                    })  
                }  
                </div>
            </div>
            }
          </div>
        )
    }
}

export default EthnicDetai;