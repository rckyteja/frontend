import React, { Component } from "react";
import Products from './components/products';
import './App.css';

class App extends Component {
  state = {}

  render() {
    return (
      <div className="App">
        <Products />
      </div>
    );
  }
}
export default App;
