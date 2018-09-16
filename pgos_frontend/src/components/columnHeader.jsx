import React, { Component } from 'react';

export default class ColumnHeader extends Component {
  render() {
    return (
      <span>{this.props.title}</span>
    )
  }
}
