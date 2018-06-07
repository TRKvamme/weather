import React, { Component } from "react";
import WeatherDisplay from "./WeatherDisplay";
import Content from './Content';

export class Layout extends Component {
  render() {
    return (
      <div className="container">

        <WeatherDisplay />
        <Content />

      </div>
    );
  }
}

export default Layout;
