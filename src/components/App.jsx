import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <NavigationBar />
        <FlashMessagesList />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
