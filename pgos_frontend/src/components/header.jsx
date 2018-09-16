import React, { Component } from 'react';
import CreateOrderModal from './createOrderModal';

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  openCreateOrderModal = () => {
    this.setState({
      ...this.state,
      showModal: true
    })
  }

  handleModalCloseRequest() {
    this.setState({
      ...this.state,
      showModal: false
    })
  }

  render() {
    const date = new Date()
    return (
      <div>
        <header>
          <div>
            <span role='img' aria-label='coffee' style={{fontSize: '20px'}}>☕</span>
            BLUE BOTTLE COFFEE
          </div>
          <span style={{marginRight: '5px', fontSize: '36px', background: '#d8d8d8'}}>
            <span>{`${date.getMonth()}/${date.getDate()}`}</span>
          </span>
          <span style={{fontSize: '24px'}}>Perfectly Ground Work Orders</span>
          <button className='create-work-order-btn'
            style={{float: 'right'}}
            onClick={() => this.openCreateOrderModal()}
            >
            CREATE WORK ORDER
          </button>
        </header>
        {this.state.showModal && <CreateOrderModal
          isOpen={this.state.showModal}
          onRequestClose={() => this.handleModalCloseRequest()}
          />}
      </div>
    )
  }
}
