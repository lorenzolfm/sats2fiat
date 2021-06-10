import React, { Component } from 'react';

import getPricesInSats from '../api/APIUtils'
import CurrencySelector from './CurrencySelector'
import Input from './Input'

class Converter extends Component {
  constructor(props) {
    super(props);
    this.handleFiatChange = this.handleFiatChange.bind(this);
    this.handleSatoshiChange = this.handleSatoshiChange.bind(this);
    this.state = {value: '', currency: '', conversionRatio: '', availableCurrencies: [], selectedCurrency: ''};
    this.apiData = ''
  }

  handleFiatChange (value) {
    this.setState({currency: 'f', value});
  }

  handleSatoshiChange (value) {
    this.setState({currency: 's', value});
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

  componentDidMount = async () => {
    const data = await getPricesInSats();
    this.apiData = data;

    // Adding availableCurrencies
    for (let currency in data) {
      currency = currency.toUpperCase()
      const list = [...this.state.availableCurrencies, currency]
      this.setState({availableCurrencies: list})
    }

    this.setState({conversionRatio: data.usd, selectedCurrency: 'USD'})
  }

  setCurrency = (currency) => {
    console.log(currency)
    if (currency === 'USD') {
      this.setState({conversionRatio: this.apiData.usd, selectedCurrency: 'USD'})
    }
    if (currency === 'BRL') {
      this.setState({conversionRatio: this.apiData.brl, selectedCurrency: 'BRL'})
    }
    if (currency === 'EUR') {
      this.setState({conversionRatio: this.apiData.eur, selectedCurrency: 'EUR'})
    }
  }

  render () {
    const currency = this.state.currency;
    const value = this.state.value;
    const conversionRatio = this.state.conversionRatio;
    const selectedCurrency = this.state.selectedCurrency;

    const fiat = currency === 'f' ?
      this.tryConvert(value, this.toFiat) : value;
    const satoshi = currency === 's' ?
      this.tryConvert(value, this.toSatoshis) : value;

    return (
      <div>
        <p>1 {selectedCurrency} equals</p>
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
              <td>
                <CurrencySelector
                  availableCurrencies={this.state.availableCurrencies}
                  setCurrency={this.setCurrency}/>
              </td>
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
