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
      </div>
    )
  }
}

export default Converter
