import React, { Component } from 'react';
import Header from './components/header';
import Modal from 'react-modal';
import WorkOrdersTable from './components/workOrdersTable';

Modal.setAppElement('#root')

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <WorkOrdersTable />
      </div>
    );
  }
}

export default App;
