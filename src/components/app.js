import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
import MapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import CITIES from '../data/cities.json';
import WeatherInfo from '../components/weatherInfo';
import ControlPanel from '../components/controlPanel';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3RhOTQwIiwiYSI6ImNqbXZ1Y3ZrNjAxaDgza3J4MDhyZTRsbzQifQ.dKtn7kjXUnVJB--kISbMdw';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 40.7127753,
        longitude: -74.0059728,
        zoom: 11,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _onViewportChange = viewport => this.setState({
    viewport: { ...this.state.viewport, ...viewport }
  });

  _resize = () => this._onViewportChange({
    width: this.props.width || window.innerWidth,
    height: this.props.height || window.innerHeight
  });

  _goToViewport = ({ longitude, latitude }) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  _renderCityMarker = (city, index) => {
    if (city !== undefined) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}>
          <WeatherInfo key={0} cities={CITIES}/>
        </Marker>
      );
    }
    else {
      return <div></div>;
    }
  }

  render() {
    const {viewport} = this.state;
    return (
      <div>
        <ControlPanel cities={CITIES} goToViewport={this._goToViewport}/>
        <div className="map">
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={this._onViewportChange}
            dragToRotate={false}
            mapboxApiAccessToken={MAPBOX_TOKEN}>
            {this._renderCityMarker(CITIES[this.props.activePlace],this.props.activePlace)}
          </MapGL>
        </div>
      </div>

    )
  };
};

const mapStateToProps = (state) => {
  return {
    activePlace: state.activePlace,
  };
};

export default connect(
  mapStateToProps)(App);


