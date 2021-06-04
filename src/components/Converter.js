import React, { Component } from 'react';

class Converter extends Component {
  state = {
    conversionRatio: 500,
    fiatInput: 1
  }

  handleInput = (event) => {
    if (event.target.value !== "") {
      const input = event.target.value;

      this.setState({
        fiatInput: input
      })
    } else {
      this.setState({
        fiatInput: ""
      })
    }
  }

  render () {
    return (
      <div>
        <p>1 USD equals</p>
        <p>{this.state.conversionRatio} satoshis</p>
        <input type="number" value={this.state.fiatInput} onChange={this.handleInput}/>
        <p>fiat</p>
        <p>equals</p>
        <p>{this.state.fiatInput * this.state.conversionRatio}</p>
      </div>
    )
  }
}

export default Converter
