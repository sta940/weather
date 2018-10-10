import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

class WeatherInfo extends Component {

  collectData(place) {
    let URL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${this.props.cities[place].latitude}&lon=${this.props.cities[place].longitude}&cnt=3&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric`;
    this.props.fetchData(URL);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activePlace !== nextProps.activePlace) {
      this.collectData(nextProps.activePlace);
    }
  }

  componentDidMount() {
    this.collectData(this.props.activePlace);
  }

  render() {
    if (this.props.weather.list !== undefined && this.props.value !== undefined) {
      let weatherData = this.props.weather.list[this.props.value];
      return (
        <div class="weatherInfo">
          <p>
            Day: {weatherData.temp.day}°C
          </p>
          <p>
            Hight: {weatherData.temp.night}°C
          </p>
          <p>
            High: {weatherData.temp.max}°C
          </p>
          <p>
            Low: {weatherData.temp.min}°C
          </p>
          <p>
            Wind Speed: {weatherData.speed} m/s
          </p>
        </div>
      );
    }
    else {
      return (
        <div>

        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weatherData,
    activePlace: state.activePlace,
    value: state.activeDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchData(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(WeatherInfo);