import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/_nav.scss';
import axios from 'axios';
import Shows from './Shows';
import base from '../base';
import config from '../config'

const movieDB = {};
movieDB.apiKey = config.MOVIEDB_API_KEY;

class App extends Component {

  state = {
    showContainer: [],
    favouritedShows: [],
  }

  componentDidMount() {
    movieDB.getAiringShows = axios.get('https://api.themoviedb.org/3/tv/airing_today', {
      params: {
        api_key: movieDB.apiKey,
        include_adult: false,
        with_original_language: 'en'
      }
    }).then((response) => {
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

    this.setState({
      favouritedShows
    })
  }

  // Unfavourite a show
  onUnFav = (show) => {
    const favouritedShows = {...this.state.favouritedShows};
    
    favouritedShows[show.id]['favourited'] = false;
    delete favouritedShows[show.id];

    this.setState({
      favouritedShows
    })
  }

  render() {
    return (
      <main>
        <header><h1>Welcome to Cliffhanger!</h1></header>
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
