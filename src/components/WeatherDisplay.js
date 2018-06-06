import React, { Component } from 'react';

class WeatherDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      geolocation: false,
      yPos:0,
      search:'',
      error:'',
    }
    this.fetchWeatherByPosition = this.fetchWeatherByPosition.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReconnect = this.handleReconnect.bind(this);
    this.setBackground = this.setBackground.bind(this);
  }

  componentDidMount() {
    var element = document.querySelector('.weather-widget');
    this.setState({
      yPos:element.getBoundingClientRect().top,
    });
    window.addEventListener('scroll',() => this.handleScroll(element));

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.fetchWeatherByPosition)
    }

  }

componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
}

handleReconnect() {
  if (this.state.geolocation === true || this.state.weather !== null) {
    this.setState({
      weather:null,
      geolocation:false,
    })
  }else {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.fetchWeatherByPosition)
    }
  }
}

handleScroll(element) {
  element.style.transform = 'translate(0px,'+ window.scrollY*0.5 +'px';
}

handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value,
    error:'',
  })
}

// if we are allowed to use geolocation, we automaticly fetch weather-data.
fetchWeatherByPosition(position) {
    const apiKey='1987e52a460a0e2b34a02da912f93dad';
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    fetch(url + '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=' + apiKey)
        .then( res => {
            return res.json();
        })
        .then(result => {
          this.setState({
            weather:result,
            geolocation:true,
          })
        })
        .catch(error => {
          this.setState({
            weather:null,
            error: error.message,
          })
    });
  }

// if we want
handleSubmit(e) {
  e.preventDefault();
  const apiKey='1987e52a460a0e2b34a02da912f93dad';
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  fetch(url + '?q='+ this.state.search + '&APPID=' + apiKey)
    .then( res => {
        return res.json();
    })
    .then(result => {
      if (result.cod === 200)
      this.setState({
        weather:result,
      })
      else {
        this.setState({
          weather:null,
          error: result.message,
        })
      }
    })
    .catch(error => {
      console.error(error);
    });
}

setBackground(weather) {
 switch(weather) {
   case 'clear sky':
    return 'clear'
   case 'few clouds':
    return 'light-clouds'
   case 'scattered clouds':
   return 'scattered-clouds'
   case 'broken clouds':
    return 'broken-clouds'
   case 'shower rain':
    return 'showers'
   case 'rain':
    return 'rain'
   case 'light rain':
    return 'rain'
   case 'thunderstorm':
    return 'thunder'
   case 'haze':
    return 'mist'
   case 'mist':
    return 'mist'
   case 'snow':
    return 'snow'
  default:
    return 'clear'
 }
}


  render() {

    const indicator = this.state.geolocation === false ? 'geo-status': 'geo-status active'
    let background = this.state.weather ?  this.setBackground(this.state.weather.weather[0].description) : '';
    const widget = this.state.weather ?
      <div className="weather-display">
        <h1>{this.state.weather.name}</h1>
        <h2>{Math.floor(this.state.weather.main.temp - 273.15) + String.fromCharCode(176) + 'C ' + this.state.weather.weather[0].main} </h2>
        <img src={"https://openweathermap.org/img/w/" + this.state.weather.weather[0].icon +".png"} alt={this.state.weather.weather[0].description} />
      </div>
      :
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Where are you?"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <input type="submit" value="Search"/>
        <div className="error"> <p>{this.state.error}</p></div>
      </form>


    return (
    <header className={background}>
      <div className='weather-widget'>
        <div className={indicator} onClick={this.handleReconnect}></div>
        {widget}
      </div>
    </header>
    );
  }

}

export default WeatherDisplay;
