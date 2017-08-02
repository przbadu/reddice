import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

function App({ ...props }) {
  return (
    <div id="wrapper">
      <NavigationBar />
      <FlashMessagesList />
      <div className="container">
        {props.children}
      </div>
    </div>
  );
}

export default App;
