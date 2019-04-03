import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/_nav.scss';
import axios from 'axios';
import Shows from './Shows';
import base from '../base';
import config from '../config'
import firebase from 'firebase';

const movieDB = {};
movieDB.apiKey = config.MOVIEDB_API_KEY;

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {

  state = {
    showContainer: [],
    favouritedShows: [],
    user: null,
  }

  componentDidMount() {
    // Check if user is logged in already
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.ref = base.syncState(this.state.user.uid, {
          context: this,
          state: 'favouritedShows'
        });
      }
    })
      console.log(this.state.favouritedShows.length,this.state.favouritedShows)

    movieDB.getAiringShows = axios.get('https://api.themoviedb.org/3/tv/airing_today', {
      params: {
        api_key: movieDB.apiKey,
        include_adult: false,
        with_original_language: 'en'
      }
    }).then((response) => {
      //Find shows that are already fav'd
      // if(this.state.favouritedShows.length > 0) {
      //   console.log(this.state.favouritedShows, 'has stuff')
      //   response.data.results.map((result) => {
          
      //   });
      //   //add key of fav'd and set to true

      // }
      this.setState({
        showContainer: response.data.results
      })
    });
  }

  // Favourite a show
  onFav = (show) => {
    //don't update state directly
    const favouritedShows = {...this.state.favouritedShows};
    //add show that got passed in
    //to favouritedShows variable
    favouritedShows[show.id] = show;
    favouritedShows[show.id]['favourited'] = true;

    this.setState({ favouritedShows });
  }

  // Unfavourite a show
  onUnFav = (show) => {
    const favouritedShows = {...this.state.favouritedShows};
    
    favouritedShows[show.id]['favourited'] = false;
    delete favouritedShows[show.id];

    this.setState({ favouritedShows });
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({ user });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        });
      });
  }

  render() {
    return (
      <main>
        <header>
          <h1>Welcome to Cliffhanger!</h1>
          {this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Login</button>}
        </header>
          <Shows
            allShows = { this.state.showContainer }
            onFav = { this.onFav }
            onUnFav = { this.onUnFav }
            favouritedShows = { this.state.favouritedShows }
          />
      </main>
    );
  }
}

export default App;
