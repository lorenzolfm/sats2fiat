import React, { Component } from 'react';
import Input from './Input'
import CurrencySelector from './CurrencySelector'
import axios from 'axios';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.handleFiatChange = this.handleFiatChange.bind(this);
    this.handleSatoshiChange = this.handleSatoshiChange.bind(this);
    this.state = {value: '', currency: '', conversionRatio: ''};
  }

  handleFiatChange(value) {
    this.setState({currency: 'f', value});
  }

  handleSatoshiChange(value) {
    this.setState({currency: 's', value});
  }

  getSatsVal = async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl')
    const btcPrice = res.data.bitcoin.brl
    const fiatInSatoshis = Math.round(1/(btcPrice/1e8));

    return fiatInSatoshis;
  }

  toSatoshis = (fiat) => {
    return this.state.conversionRatio * fiat;
  }

  toFiat = (satoshis) => {
    return satoshis / this.state.conversionRatio;
  }

  tryConvert = (value, convert) => {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
      return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  componentDidMount () {
    this.getSatsVal()
      .then(val => {
        this.setState({conversionRatio: val});
      })
  }

  render () {
    const currency = this.state.currency;
    const value = this.state.value;
    const conversionRatio = this.state.conversionRatio

    const fiat = currency === 'f' ?
      this.tryConvert(value, this.toFiat) : value;
    const satoshi = currency === 's' ?
      this.tryConvert(value, this.toSatoshis) : value;

    return (
      <div>
        <p>1 BRL equals</p>
        <p>{conversionRatio} satoshis</p>
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
              <td><CurrencySelector /></td>
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
