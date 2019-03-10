import React, { Component } from 'react'

export class Content extends Component {
  render() {
    return (
        <main>
          <h1>Sunshine</h1>
          <h2>Wherever you are</h2>
          <section className="content">
            <article className="post1">
              <h2>One day</h2>
              <p>I will put some content here.</p>
            </article>
            <article className="post2">
              <h2>And it will</h2>
              <p>
                Be great!
              </p>
            </article>
            <article className="post3">
              <h2>But for now</h2>
              <p>There is nothing here.</p>
            </article>
          </section>
        </main>
    )
  }
}

export default Content;
