import React, { Component } from 'react';

class Converter extends Component {
  state = {
    conversionRatio: 500,

    fiat: 1,
    satoshi: 500
  }

  handleInput = (event) => {
    if (event.target.id === "fiatInput") {
      if (event.target.value !== "") {
        const input = event.target.value;

        this.setState({
          fiat: input,
          satoshi: input * this.state.conversionRatio
        })
      } else {
        this.setState({
          fiat: "",
          satoshi: ""
        })
      }
    }

    if (event.target.id === "satoshiInput") {
      if (event.target.value !== "") {
        const input = event.target.value;

        this.setState({
          fiat: input / this.state.conversionRatio,
          satoshi: input
        })
      } else {
        this.setState({
          fiat: "",
          satoshi: ""
        })
      }
    }

  }

  render () {
    return (
      <div>
        <p>1 USD equals</p>
        <p>{this.state.conversionRatio} satoshis</p>
        <input
          id="fiatInput"
          type="number"
          value={this.state.fiat}
          onChange={this.handleInput}
        />
        <p>fiat</p>
        <p>equals</p>
        <input
          id="satoshiInput"
          type="number"
          value={this.state.satoshi}
          onChange={this.handleInput}
        />
      </div>
    )
  }
}

export default Converter
