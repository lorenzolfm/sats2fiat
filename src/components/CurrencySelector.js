import React, { Component } from 'react';

class CurrencySelector extends Component {
  constructor (props) {
    super(props);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
  }

  onChangeCurrency (event) {
    this.props.setCurrency(event.target.value);
  }

  render () {
    const availableCurrencies = this.props.availableCurrencies;
    return (
      <select onChange={this.onChangeCurrency}>
        {availableCurrencies.map((currency) => {
          return <option value={currency} key={currency}>{currency}</option>
        })}
      </select>
    );
  }
}

export default CurrencySelector;
