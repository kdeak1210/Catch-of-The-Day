import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(e) {
    e.preventDefault();
    console.log('You changed the URL');
    // First grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // Second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        { /* This is only way to comment in JSX */ }
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={ (input) => {this.storeInput = input}} />
        <button type="submit">Visit Store </button>
      </form>
    );
  }
}

// 'Surface' our Context by telling React that StorePicker expects a router of type object
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
