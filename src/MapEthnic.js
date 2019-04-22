import React, { Component } from 'react';
// import { GoogleApiWrapper } from 'google-maps-react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import location from '@material-ui/icons/LocationOn';
// import InfoWindowEx from '../components/info-window-ex'
// import ModalPlantEthnic from '../components/modal-plant-ethnic'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import L from 'leaflet';
import locationIcons from './placeholder.svg';

const mapStyles = {
  width: '100%',
  height: '90%'
};

const LocationIcons = L.icon({
    iconUrl: locationIcons,
    iconSize: [25, 33]
  });

export class MapHerb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      modalOpen:'',
      onSelect: [],
      activeMarker: {},
      selectedPlace: {},
      province: [],
      ethnic: [],
      plantethnic: []
    }
    this.onEthnicClick = this.onEthnicClick.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  async componentDidMount() {
    await this.getData();
    await this.getDataProvince();
    await this.getDataPlantEthnic();
  }

  async getDataProvince(){
    const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/province/';
    const res = await Axios.get(url);
    const { data } = await res;
    let province = data.data;
    console.log(province)
    province.forEach(province => {
      province.ethnic = [];
      this.state.ethnic.forEach(ethnic => {
        if (province._id === ethnic.province){
          province.ethnic.push(ethnic);
        }
      })
    })

    this.setState({
      province: province, 
      loading: false
    })
  }
  
  async getData(){
    const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/ethnic';
    const res = await Axios.get(url);
    const { data } = await res;
    let newData = this.state.ethnic.concat(data.data);
    this.setState({
      ethnic: newData, 
      loading: false
    })
  }

  async getDataPlantEthnic(){
    const url = 'http://ci.apps.cs.ipb.ac.id/jamu/api/plantethnic/indexes';
    const res = await Axios.get(url);
    const { data } = await res;
    let newData = data.plantethnic;
    this.setState({
      plantethnic: newData, 
      loading: false
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  async onEthnicClick (e){
    let onSelect = await this.state.plantethnic.filter( c => {
      return c.refEthnic === e.target.dataset.value
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
      onSelect: result,
      modalOpen: 'list'
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  closeBtn() {
    this.setState({
      modalOpen: ''
    })
  }

  render() {
    const center = [-2.5489, 120.0149]  
    return (
      <div style={{
          marginTop: "70px"
      }}>
        <Map style={{
             height:"550px",
             width:"100%"
        }}
        center={center} 
        zoom={5.4}
        onViewportChanged={this.onViewportChanged}
        viewport={this.state.viewport}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.province.map( item => (
                    <Marker
                      position={[item.province_lat, item.province_lon]}
                      icon={LocationIcons}
                      >
                        <Popup>
                            <p><em>{item.province_name}</em></p>
                            {item.ethnic.map(ethnic => {
                            return(
                                <button key={ethnic._id}>
                                  <Link to={`/ethnic/${ ethnic._id }`}>
                                      {ethnic.name}
                                  </Link>
                                </button>
                            )
                            })}
                        </Popup>

                    </Marker>
                ))} 
      </Map>
      </div>
    );
  }
}
export default MapHerb;