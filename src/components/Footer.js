import React, { Component } from 'react'

export class Footer extends Component {

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <footer>
      <section className="footer-content">
        <section>
            <h3>Contact</h3>
            <ul>
              <li>item</li>
              <li>item</li>
              <li>item</li>
              <li>item</li>
            </ul>
        </section>
        <section>
            <h3>Contact</h3>
            <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
            </ul>
        </section>
        <section className="newsletter">
          <h3>Subscribe to newsletter</h3>
          <form onSubmit={this.onSubmit}> 
            <input type="email" placeholder="Email..."/>
            <input type="submit" />
          </form>
        </section>

    </section>
        
      </footer>
    )
  }
}

export default Footer
