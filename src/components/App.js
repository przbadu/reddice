import React, { Component } from 'react';
import NavigationBar from './NavigationBar';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <NavigationBar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
