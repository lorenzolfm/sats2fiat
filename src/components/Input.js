import React, { Component } from 'react';

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

export default Input
