import React, { Component } from 'react';

class CurrencySelector extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu (event) {
    event.preventDefault();

    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>Show Menu</button>

        {
          this.state.showMenu
            ? (
              <div className="menu">
                {this.props.availableCurrencies.map(item => (
                  <button key={item} onClick={() => this.props.setCurrency(item)}>{item}</button>
                ))}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default CurrencySelector;
