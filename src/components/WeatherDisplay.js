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
    this.init = this.init.bind(this);
  }

componentDidMount() {
    var element = document.querySelector('.weather-widget');
    this.setState({
      yPos:element.getBoundingClientRect().top,
    });
    window.addEventListener('scroll',() => this.handleScroll(element));    
    this.init();
}

init() {
  return new Promise((resolve, reject) =>
  navigator.permissions ?

    // Permission API is implemented
    navigator.permissions.query({
      name: 'geolocation'
    }).then(permission =>
      // is geolocation granted?
      permission.state === "granted"
        ? navigator.geolocation.getCurrentPosition(this.fetchWeatherByPosition) 
        : resolve(null)
    ) :

  // Permission API was not implemented
  reject(new Error("Permission API is not supported"))
  )
}


componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
}

handleReconnect() {
  if (this.state.geolocation === true || this.state.weather !== null) {
    this.setState({
      weather:null,
      geolocation:false,
      search:'',
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
        <h2>{Math.floor(this.state.weather.main.temp - 273.15) + String.fromCharCode(176)  + 'C'} </h2>
        <p>{this.state.weather.weather[0].main}</p>
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
        <div className={indicator} onClick={this.handleReconnect}>
          <svg height="20px" id="location-icon" width="20px"><path d="M8,0C4.687,0,2,2.687,2,6c0,3.854,4.321,8.663,5,9.398C7.281,15.703,7.516,16,8,16s0.719-0.297,1-0.602  C9.679,14.663,14,9.854,14,6C14,2.687,11.313,0,8,0z M8,10c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S10.209,10,8,10z M8,4  C6.896,4,6,4.896,6,6s0.896,2,2,2s2-0.896,2-2S9.104,4,8,4z"/></svg>
        </div>
        {widget}
      </div>
    </header>
    );
  }

}

export default WeatherDisplay;
