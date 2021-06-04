import React, { Component } from 'react';

const IsMillionaire = (props) => {
  if (props.satoshis >= 10e6) {
    return <p>Congrats. You're a millionarire</p>
  }
  return <p>Stay humble and stack sats!</p>
}

const satsVal = 500;

const toSatoshis = (fiat) => {
  return satsVal * fiat;
}

const toFiat = (satoshis) => {
  return satoshis / satsVal;
}

const tryConvert = (value, convert) => {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const currencyNames = {
  f: 'fiat',
  s: 'satoshi'
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    const currency = this.props.currency

    return (
      <fieldset>
        <legend>Enter value in {currencyNames[currency]}:</legend>
        <input
          value={value}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}

class Converter extends Component {
  constructor(props) {
    super(props);
    this.handleFiatChange = this.handleFiatChange.bind(this);
    this.handleSatoshiChange = this.handleSatoshiChange.bind(this);
    this.state = {value: '', currency: ''};
  }

  handleFiatChange(value) {
    this.setState({currency: 'f', value});
  }

  handleSatoshiChange(value) {
    this.setState({currency: 's', value});
  }

  render () {
    const currency = this.state.currency;
    const value = this.state.value;

    const fiat = currency === 'f' ?
      tryConvert(value, toFiat) : value;
    const satoshi = currency === 's' ?
      tryConvert(value, toSatoshis) : value;

    return (
      <div>
        <Input
          currency="f"
          value={fiat}
          onValueChange={this.handleSatoshiChange}
        />
        <Input
          currency="s"
          value={satoshi}
          onValueChange={this.handleFiatChange}
        />
        <IsMillionaire
          satoshis={parseFloat(satoshi)} />
      </div>
    )
  }
}

export default Converter
