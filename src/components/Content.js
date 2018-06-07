import React, { Component } from 'react'

export class Content extends Component {
  render() {
    return (
        <main>
          <h1>Sunshine</h1>
          <h2>Wherever you are</h2>
          <section className="content">
            <article className="post1">
              <h2>Where you are</h2>
              <p>Instant weather where you are!</p>
            </article>
            <article className="post2">
              <h2>Anywhere</h2>
              <p>
                Or anywhere else in the world. 
              </p>
            </article>
            <article className="post3">
              <h2>Title</h2>
              <p>quid anim aliqua ipsum quis magna velit irure tempor nisi</p>
            </article>
          </section>
        </main>
    )
  }
}

export default Content;
