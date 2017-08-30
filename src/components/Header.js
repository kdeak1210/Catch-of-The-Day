import React from 'react';

// Stateless Functional Component - No need to use a whole class here.
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      {/* Removing 'this' from 'this.props' bc not bound to anything here */}
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  );
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;
