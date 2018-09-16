import React, { Component } from 'react';

export default class TableCell extends Component {
  renderShipDate = () => {
    let priority = this.props.original.priority
    return (
      <div style={{textAlign: 'center'}}>
        <span>{this.props.value}</span>
        {priority ? <span style={{float: 'right'}}>*</span> : null}
      </div>
    )
  }

  renderOrderNumber = () => {
    return (
      <div style={{textAlign: 'right'}}>{this.props.value}</div>
    )
  }

  renderDefault = () => {
    return <div>{this.props.value}</div>
  }

  render() {
    switch(this.props.attr) {
      case 'id':
        return this.renderDefault()
      case 'coffee':
        return this.renderDefault()
      case 'method':
        return this.renderDefault()
      case 'numberOfCases':
        return this.renderDefault()
      case 'packetsPerCase':
        return this.renderDefault()
      case 'shipDate':
        return this.renderShipDate()
      case 'order':
        return this.renderOrderNumber()
      default:
        return this.renderDefault()
    }
  }
}
