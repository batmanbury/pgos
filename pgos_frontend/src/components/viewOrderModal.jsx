import React, { Component } from 'react';
import Modal from 'react-modal';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class ViewOrderModal extends Component {
  render() {
    return (
      <Query skip={!this.props.isOpen} query={
        gql`
          {
            workOrder(id: ${this.props.orderId}) {
              id
              coffee_name
              brew_method
              num_cases
              num_packets
              ship_date
              priority
              order_number
              notes
            }
          }
        `
      }>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return null;
          let workOrder = data.workOrder
          return (
            <Modal
              isOpen={this.props.isOpen}
              onRequestClose={this.props.onRequestClose}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                content: {
                  width: '800px',
                  height: '500px',
                  margin: 'auto'
                }
              }}
              >
              <h1>
                Perfectly Ground Work Orders
                <button style={{float: 'right'}} onClick={() => this.props.onRequestClose()}>X</button>
              </h1>

              <div>
                <label>
                  Coffee:
                  <span>{workOrder.coffee_name}</span>
                </label>
              </div>

              <div>
                <label>
                  Brew Method:
                  <span>{workOrder.brew_method}</span>
                </label>
              </div>

              <div>
                <label>
                  Ship Date:
                  <span>{workOrder.ship_date}</span>
                </label>
              </div>

              <div>
                <label>
                  Number of Cases:
                  <span>{workOrder.num_cases}</span>
                </label>
              </div>

              <div>
                <label>
                  Packets per Case:
                  <span>{workOrder.num_packets}</span>
                </label>
              </div>

              <div>
                <label>
                  Notes:
                  <input className='readonly-notes-input' type="text" readOnly value={workOrder.notes || ''}/>
                </label>
              </div>

              <div>
                <label>
                  Priority:
                  <input type="checkbox" readOnly checked={!!workOrder.priority} />
                </label>
              </div>
            </Modal>
          )
        }}
      </Query>
    )
  }
}
