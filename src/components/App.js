import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/_nav.scss';
import axios from 'axios';
import Shows from './Shows';

const movieDB = {};
movieDB.apiKey = '2260b97cfa33dd979f11ee4d6214853e';

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
      // console.log(response.data.results);
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

    // const addFavKey = Object.assign(favouritedShows, {favourited: true});

    this.setState({
      favouritedShows
    })
  }

  // Unfavourite a show
  onUnfav = (show) => {
    const favouritedShows = {...this.state.favouritedShows};
    
    favouritedShows[show.id]['favourited'] = false;

    for (let favouritedShow in favouritedShows) {
      //TODO: why is favouritedShow a string??
      if (parseInt(favouritedShow) === show.id) {
        // console.log('same show');
        // favouritedShow = null;
      }
    }
    //add show that got passed in
    //to favouritedShows variable
    // favouritedShows[show.id] = show;

    this.setState({
      favouritedShows
    })
  }

  render() {
    return (
      <div className="App">
        <header><h1>Welcome to Cliffhanger!</h1></header>
        <main>
          <Shows
            allShows = { this.state.showContainer }
            onFav = { this.onFav }
            onUnFav = { this.onUnFav }
            favouritedShows = { this.state.favouritedShows }
          />
        </main>
      </div>
    );
  }
}

export default App;
