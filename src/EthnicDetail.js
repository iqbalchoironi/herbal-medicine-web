import React, { Component } from 'react';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class EthnicDetai extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            onDisplay: [],
            plantethnic: []
        }
      }
    
      async componentDidMount() {
        await this.getDataPlantEthnic();
      }

      async getDataPlantEthnic(){
        const {id} = this.props.match.params;
        const url = '/jamu/api/plantethnic';
        const res = await Axios.get(url);
        const { data } = await res;
        let newData = data.data;

        let onSelect = await newData.filter( c => {
            return c.refEthnic === id
          })
          
          var result = [];
          await onSelect.forEach(item => {
            var name = item.disease;
      
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
        
        
        this.setState({
          plantethnic: newData, 
          loading: false
        })
      }

    render(){
        return (
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
                                        <Typography>{plantethnic.species}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails style={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}>
                                        <Typography variant="caption" gutterBottom>{plantethnic.disease}</Typography> 
                                        <Typography variant="caption" gutterBottom>{plantethnic.family}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.section}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.species}</Typography>
                                        <Typography variant="caption" gutterBottom>{plantethnic.use}</Typography>
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
        )
    }
}

export default EthnicDetai;