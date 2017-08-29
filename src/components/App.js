import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'


class App extends React.Component {

  constructor() {
    super();
    this.addFish = this.addFish.bind(this); // bind method to App component
    this.loadSamples = this.loadSamples.bind(this);
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

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
}

export default App;
