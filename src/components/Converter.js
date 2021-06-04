import React, { Component } from 'react';

class Converter extends Component {
  state = {
    conversionRatio: 500

  }

  render () {
    return (
      <div>
        <p>1 USD equals</p>
        <p>{this.state.conversionRatio} satoshis</p>
        <input type="number"/>
        <p>fiat</p>
        <p>equals</p>
        <p>500</p>
      </div>
    )
  }
}

export default Converter
