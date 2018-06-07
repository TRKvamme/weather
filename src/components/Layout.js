import React, { Component } from "react";
import WeatherDisplay from "./WeatherDisplay";
import Content from './Content';
import Footer from './Footer';

export class Layout extends Component {
  render() {
    return (
      <div className="container">

        <WeatherDisplay />
        <Content />
        <Footer/>
      </div>
    );
  }
}

export default Layout;
