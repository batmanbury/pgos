import React, { Component } from 'react';
import Modal from 'react-modal';
import { Mutation } from 'react-apollo';
import { GET_WORK_ORDERS } from '../graphql/getWorkOrders'
import { CREATE_WORK_ORDER } from '../graphql/createWorkOrder'

export default class CreateOrderModal extends Component {
  render() {
    let coffee_name_select;
    let brew_method_select;
    let num_cases_input;
    let num_packets_select;
    let ship_date_input;
    let priority_checkbox;
    let notes_input;

    return (
      <Mutation
        mutation={CREATE_WORK_ORDER}
        refetchQueries={[{query: GET_WORK_ORDERS}]}
        >
        {createWorkOrder => (
          <Modal
            id='create-work-order-modal'
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
            <form id='create-work-order-form'
              onSubmit={e => {
                e.preventDefault();
                createWorkOrder({
                  variables: {
                    coffee_name: coffee_name_select.value,
                    brew_method: brew_method_select.value,
                    num_cases: parseInt(num_cases_input.value, 10),
                    num_packets: parseInt(num_packets_select.value, 10),
                    ship_date: ship_date_input.value,
                    priority: priority_checkbox.checked,
                    notes: notes_input.value
                  }
                });
                coffee_name_select.value = ''
                brew_method_select.value = ''
                num_cases_input.value = ''
                num_packets_select.value = ''
                ship_date_input.value = ''
                priority_checkbox.value = false
                notes_input.value = ''
                this.props.onRequestClose()
              }}
            >
              <div>
                <label>
                  Coffee:
                  <select className='coffee-select' required ref={node => { coffee_name_select = node; }}>
                    <option></option>
                    <option value="bella donovan">Bella Donovan</option>
                    <option value="giant steps">Giant Steps</option>
                  </select>
                </label>
              </div>

              <div>
                <label>
                  Brew Method:
                  <select className='brew-select' required ref={node => { brew_method_select = node; }}>
                    <option></option>
                    <option value="aeropress">Aeropress</option>
                    <option value="coffee maker">Coffee Maker</option>
                    <option value="cold brew">Cold Brew</option>
                    <option value="french press">French Press</option>
                    <option value="pour over">Pour Over</option>
                  </select>
                </label>
              </div>

              <div>
                <label>
                  Ship Date:
                  <input className='ship-date-input' required placeholder="mm/dd/yyyy" type="text"
                    pattern="(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d"
                    ref={node => { ship_date_input = node; }} />
                </label>
              </div>

              <div>
                <label>
                  Number of Cases:
                  <input className='cases-input' required type="number" pattern="\d{+}" ref={node => { num_cases_input = node; }} />
                </label>
              </div>

              <div>
                <label>
                  Packets per Case:
                  <select className='packets-select' required ref={node => { num_packets_select = node; }}>
                    <option></option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </label>
              </div>

              <div>
                <label>
                  Notes:
                  <input className='notes-input' type="text" ref={node => { notes_input = node; }} />
                </label>
              </div>

              <div>
                <label>
                  Priority:
                  <input className='priority-checkbox' type="checkbox" ref={node => { priority_checkbox = node; }} />
                </label>
              </div>

              <div>
                <button id="submit-work-order-btn" type="submit">SUBMIT WORK ORDER</button>
              </div>
            </form>
          </Modal>
        )}
      </Mutation>
    );
  }
}
