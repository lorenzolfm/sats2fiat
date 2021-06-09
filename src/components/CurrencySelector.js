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
      showMenu: true,
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
                <button>USD</button>
                <button>BRL</button>
                <button>EUR</button>
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
