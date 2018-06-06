import React, { Component } from "react";
import WeatherDisplay from "./WeatherDisplay";

class Layout extends Component {
  render() {
    return (
      <div className="container">
        <WeatherDisplay />


        <main>
          <h1>Sunshine</h1>
          <hr />
          <div className="content">
            <article className="post1">
              <h2>Simple weather app</h2>
              <p></p>
            </article>
            <article className="post2">
              <h2>Title</h2>
              <p>
                sint tamen dolore culpa noster ipsum velit multos nulla nisi
              </p>
            </article>
            <article className="post3">
              <h2>Title</h2>
              <p>quid anim aliqua ipsum quis magna velit irure tempor nisi</p>
            </article>
          </div>
        </main>


      </div>
    );
  }
}

export default Layout;
