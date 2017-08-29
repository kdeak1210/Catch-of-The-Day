import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';


class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this); // bind addFish method
    // Initial State (aka getInitialState())
    this.state = {
      fishes: {},
      order: {}
    };
  }
  addFish(fish) {
    // update our state - make a copy of the existing state (spread operator)
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now(); // this will ALWAYS be unique
    fishes[`fish-${timestamp}`] = fish;
    // set state - explicitly tell React which state to update
    this.setState({ fishes });  // syntactic sugar for fishes: fishes
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
