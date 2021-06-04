import React, { Component } from 'react';

class Converter extends Component {
  state = {
    conversionRatio: 500,
    satoshis: 500,

    fiatInput: 1,
    satoshisInput: 500,
  }

  handleInput = (event) => {
    if (event.target.id === "fiatInput") {
      console.log("satoshiInput")
      if (event.target.value !== "") {
        const input = event.target.value;

        this.setState({
          fiatInput: input,
          satoshis: input*this.state.conversionRatio
        })
      } else {
        this.setState({
          fiatInput: "",
          satoshis: ""
        })
      }
    }

    if (event.target.id === "satoshiInput") {}

  }

  render () {
    return (
      <div>
        <p>1 USD equals</p>
        <p>{this.state.conversionRatio} satoshis</p>
        <input
          id="fiatInput"
          type="number"
          value={this.state.fiatInput}
          onChange={this.handleInput}
        />
        <p>fiat</p>
        <p>equals</p>
        <input
          id="satoshiInput"
          type="number"
          value={this.state.satoshis}
          onChange={this.handleInput}
        />
      </div>
    )
  }
}

export default Converter
