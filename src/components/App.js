import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this); // bind method to App component
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // Initial State (aka getInitialState())
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // A React LifeCycle method - invoked once, both on the client and server, immediately before the INITIAL rendering occurs
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes' // the state we want to sync
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    // Stop syncing when we goto another store, so we don't rack up tons of listeners behind the scenes...
    base.removeBinding(this.ref);
  }

  // Invoked immediately before rendering when new props or state are being received (changed)
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;  // this is an object ex fishes['mykey']
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null; // Cannot use 'delete' bc firebase acts weird
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1; // || 1 bc can't add 1 if doesn't exist
    // update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];  // delete is actually a native JS method...
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={"Fresh Seafood Market"} />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          storeId={this.props.params.storeId}
        />
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
