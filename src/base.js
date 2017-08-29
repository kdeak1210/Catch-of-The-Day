import Rebase from 're-base';

const base = Rebase.createClass({
  apiKey: "AIzaSyAmNcJfHQyvr5H9TLK13woPQ0wvvCOqvRk",
  authDomain: "catch-of-the-day-kyle.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-kyle.firebaseio.com",
});

// Anytime we want to work with Firebase, we can import this base and its going to be already connected so we can just work with the API right away
export default base;
