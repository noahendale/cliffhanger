import React from 'react';

class Shows extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.allShows.map((show) => {
            if (show.overview && show.backdrop_path) {
              return (
                <section className = "showContainer" key = { show.id }>
                  <h3>{ show.name }</h3>
                  { show.favourited
                  ?
                  // If already favourited:
                  <i 
                    className = "fas fa-star"
                    aria-hidden = "true"
                    onClick = { () => {this.props.onUnFav(show)} }>
                  </i>
                  :
                  // If not favourited:
                  <i 
                    className = "fal fa-star"
                    aria-hidden = "true"
                    onClick = { () => {this.props.onFav(show)} }>
                  </i>}
                  <p>{ show.overview }</p>
                  <img src = {`http://image.tmdb.org/t/p/w300/${show.backdrop_path}`} alt = {`${show.name} poster`}/>
                </section>
              )
            } else {
              return null;
            }
          })
        }
      </React.Fragment>
    )
  }
}

export default Shows;