import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Query } from 'react-apollo';
import { GET_WORK_ORDERS } from '../graphql/getWorkOrders'
import ColumnHeader from '../components/columnHeader';
import TableCell from '../components/tableCell';
import ViewOrderModal from './viewOrderModal';

export default class WorkOrdersTable extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  openViewOrderModal = orderId => {
    this.setState({
      ...this.state,
      showModal: true,
      modalOrderId: orderId
    })
  }

  getColumns() {
    return [
      {
        Header: () => (<ColumnHeader title='Coffee'/>),
        Cell: row => (<TableCell value={row.value} original={row.original} attr='coffee' />),
        accessor: 'coffee_name',
        sortable: false
      }, {
        Header: () => (<ColumnHeader title='Method'/>),
        Cell: row => (<TableCell value={row.value} original={row.original} attr='method' />),
        accessor: 'brew_method',
        sortable: false
      }, {
        Header: () => (<ColumnHeader title='Number of Cases'/>),
        Cell: row => (<TableCell value={row.value} original={row.original} attr='numberOfCases' />),
        accessor: 'num_cases',
        sortable: false
      }, {
        Header: () => (<ColumnHeader title='Packets per Case'/>),
        Cell: row => (<TableCell value={row.value} original={row.original} attr='packetsPerCase' />),
        accessor: 'num_packets',
        sortable: false
      }, {
        Header: () => (<ColumnHeader style={{cursor: 'pointer'}} title='Ship Date'/>),
        Cell: row => (<TableCell value={row.value} original={row.original} attr='shipDate' />),
        accessor: 'ship_date',
        sortable: true
      }, {
        Header: () => (<ColumnHeader style={{cursor: 'pointer'}} title='Order'/>),
        Cell: row => (<TableCell value={row.value} original={row.original} attr='order' />),
        accessor: 'order_number',
        sortable: true
      }, {
        Header: () => (<ColumnHeader title='View'/>),
        Cell: row => (
          <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => this.openViewOrderModal(row.original.id)}>
            <span role='img' aria-label='eye'>👁</span>
          </div>
        ),
        sortable: false
      }
    ]
  }

  handleModalCloseRequest() {
    this.setState({
      ...this.state,
      showModal: false
    })
  }

  render() {
    return (
      <Query query={GET_WORK_ORDERS}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return <p>Error</p>;
          let workOrders = data.workOrders.edges.map((item) => item.node);
          return (
            <div>
              <ReactTable
                style={{
                  marginTop: '50px'
                }}
                className="-striped -highlight"
                data={workOrders}
                columns={this.getColumns()}
                showPageSizeOptions={false}
                defaultPageSize={25}
                />
              {this.state.showModal && <ViewOrderModal
                orderId={this.state.modalOrderId}
                isOpen={this.state.showModal}
                onRequestClose={() => this.handleModalCloseRequest()}
                />}
            </div>
          )
        }}
      </Query>
    )
  }
}
