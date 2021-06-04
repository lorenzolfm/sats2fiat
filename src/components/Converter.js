import React, { Component } from 'react';
import axios from 'axios';

const getSatsVal = async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl')
  const btcPrice = res.data.bitcoin.brl
  const fiatInSatoshis = Math.round(1/(btcPrice/1e8));

  return fiatInSatoshis;
}

//TODO: get value from API
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

    return (
      <input
        value={value}
        onChange={this.handleChange}
      />
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
        <p>1 USD equals</p>
        <p>{satsVal} satoshis</p>
        <table>
          <tbody>
            <tr>
              <td>
                <Input
                  currency="f"
                  value={fiat}
                  onValueChange={this.handleSatoshiChange}
                />
              </td>
              <td>USD</td>
            </tr>
            <tr>
              <td>
                <Input
                  currency="s"
                  value={satoshi}
                  onValueChange={this.handleFiatChange}
                />
              </td>
              <td>satoshis</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Converter
