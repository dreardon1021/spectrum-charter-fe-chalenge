import React, { Component } from "react";
import "./App.css";

import Nav from "../Nav/Nav";
import SearchContainer from "../SearchContainer/SearchContainer";

class App extends Component {
  constructor() {
    super();
    this.logoResetTable = this.logoResetTable.bind(this);
    this.updateCurrentSearchData = this.updateCurrentSearchData.bind(this);
    this.state = {
      allRestaurantData: [],
      currentSearchData: [],
      filterByStateOn: false,
      filterByGenreOn: false,
      possibleRestaurantStates: [],
      possibleRestaurantGenres: []
    };
  }

  findPossibleRestaurantStates(data) {
    let possibleStates = []
    data.forEach(restaurant => {
      if(!possibleStates.includes(restaurant.state)) {
        possibleStates.push(restaurant.state)
      }
    })
    return possibleStates
  }

  findPossibleRestaurantGenres(data) {
    let possibleGenres = []
    data.forEach(restaurant => {
      let restaurantGenreArray = restaurant.genre.split(',')
      restaurantGenreArray.forEach(genre => {
        if(!possibleGenres.includes(genre)) {
          possibleGenres.push(genre)
        }
      })
    })
    return possibleGenres
  }

  componentDidMount() {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      method: "GET",
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt"
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState(
          { allRestaurantData: data,
            currentSearchData: data,
            possibleRestaurantStates: this.findPossibleRestaurantStates(data),
            possibleRestaurantGenres: this.findPossibleRestaurantGenres(data)
          }
        )
      );
  }

  logoResetTable(allData) {
    this.setState({ currentSearchData: allData });
  }

  updateCurrentSearchData(newSearchQuery) {
    let newCurrentSearchData = [];
    this.state.currentSearchData.forEach(resturant => {
      if (
        resturant.name.toLowerCase().match(newSearchQuery.toLowerCase()) ||
        resturant.city.toLowerCase().match(newSearchQuery.toLowerCase()) ||
        resturant.genre.toLowerCase().match(newSearchQuery.toLowerCase())
      ) {
        newCurrentSearchData.push(resturant);
      }
    });
    this.setState({ currentSearchData: newCurrentSearchData });
  }

  render() {
    return (
      <main>
        <Nav
          logoResetTable={this.logoResetTable}
          allRestaurantData={this.allRestaurantData}
        />
        <SearchContainer
          updateCurrentSearchData={this.updateCurrentSearchData}
          possibleRestaurantStates={this.state.possibleRestaurantStates}
          possibleRestaurantGenres={this.state.possibleRestaurantGenres}
        />
      </main>
    );
  }
}

export default App;
