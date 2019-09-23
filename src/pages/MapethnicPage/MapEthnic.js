import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Axios from 'axios';
import L from 'leaflet';
import locationIcons from './placeholder.svg';

import Chip from '@material-ui/core/Chip';

import Spinner from '../../components/Spinner/Spinner';
import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

const LocationIcons = L.icon({
  iconUrl: locationIcons,
  iconSize: [25, 33]
});

export class MapHerb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showingInfoWindow: false,
      modalOpen: '',
      onSelect: [],
      activeMarker: {},
      selectedPlace: {},
      province: [],
      ethnic: [],
      plantethnic: [],
      snackbar: {
        open: false,
        success: false,
        message: ''
      }
    };
    // this.onEthnicClick = this.onEthnicClick.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  chipFilter = item => {
    window.location.href = `/ethnic/${item}`;
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });
    await this.getData();
    await this.getDataProvince();
    this.setState({
      loading: false
    });
  }

  async getDataProvince() {
    try {
      const url = '/jamu/api/province/';
      const res = await Axios.get(url);
      const { data } = await res;
      let province = data.data;
      province.forEach(province => {
        province.ethnic = [];
        this.state.ethnic.forEach(ethnic => {
          if (ethnic.refProvince !== undefined) {
            if (province._id === ethnic.refProvince._id) {
              province.ethnic.push(ethnic);
            }
          }
        });
      });
      this.afterUpdate(data.success, data.message);
      this.setState({
        province: province,
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

  async getData() {
    try {
      const url = '/jamu/api/ethnic';
      const res = await Axios.get(url);
      const { data } = await res;
      this.afterUpdate(data.success, data.message);
      this.setState({
        ethnic: data.data,
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

  // async getDataPlantEthnic(){
  //   const url = '/jamu/api/plantethnic/indexes';
  //   const res = await Axios.get(url);
  //   const { data } = await res;
  //   let newData = data.plantethnic;
  //   this.setState({
  //     plantethnic: newData,
  //     loading: false
  //   })
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  // async onEthnicClick (e){
  //   let onSelect = await this.state.plantethnic.filter( c => {
  //     return c.refEthnic === e.target.dataset.value
  //   })

  //   var result = [];
  //   await onSelect.forEach(item => {
  //     var name = item.disease;

  //     if (!(name in result)) {
  //       result[name] = [];
  //       result[name].push(item);
  //     } else {
  //       result[name].push(item);
  //     }
  //   })

  //  this.setState({
  //     onSelect: result,
  //     modalOpen: 'list'
  //   })
  // }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
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
    const center = [-2.5489, 120.0149];
    return (
      <div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <Map
            style={{
              height: '560px',
              width: '100%'
            }}
            center={center}
            zoom={5.4}
            onViewportChanged={this.onViewportChanged}
            viewport={this.state.viewport}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.province.map(item => (
              <Marker
                position={[item.province_lat, item.province_lon]}
                icon={LocationIcons}
              >
                <Popup>
                  <p>
                    <em>ethnic in province {item.province_name} :</em>
                  </p>
                  {item.ethnic.map(ethnic => {
                    return (
                      <Chip
                        key={ethnic._id}
                        label={ethnic.name}
                        variant="outlined"
                        clickable
                        onClick={() => this.chipFilter(ethnic._id)}
                      ></Chip>
                    );
                  })}
                </Popup>
              </Marker>
            ))}
          </Map>
        )}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}
export default MapHerb;
