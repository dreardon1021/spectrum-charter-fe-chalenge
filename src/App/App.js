import React, { Component } from "react";
import "./App.css";

import Nav from "../Nav/Nav";
import SearchContainer from "../SearchContainer/SearchContainer";
import { isArgumentPlaceholder } from "@babel/types";
import { all } from "q";

class App extends Component {
  constructor() {
    super();
    this.logoResetTable = this.logoResetTable.bind(this);
    this.updateCurrentSearchData = this.updateCurrentSearchData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.formResetTable = this.formResetTable.bind(this)
    this.state = {
      allRestaurantData: [],
      currentSearchData: [],
      currentFilterData: [],
      possibleRestaurantStates: [],
      possibleRestaurantGenres: [],
      filterOn: false
    };
  }

  findPossibleRestaurantStates(data) {
    let possibleStates = [];
    data.forEach(restaurant => {
      if (!possibleStates.includes(restaurant.state)) {
        possibleStates.push(restaurant.state);
      }
    });
    return possibleStates;
  }

  findPossibleRestaurantGenres(data) {
    let possibleGenres = [];
    data.forEach(restaurant => {
      let restaurantGenreArray = restaurant.genre.split(",");
      restaurantGenreArray.forEach(genre => {
        if (!possibleGenres.includes(genre)) {
          possibleGenres.push(genre);
        }
      });
    });
    return possibleGenres;
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
        this.setState({
          allRestaurantData: data,
          currentSearchData: data,
          currentFilterData: data,
          possibleRestaurantStates: this.findPossibleRestaurantStates(data),
          possibleRestaurantGenres: this.findPossibleRestaurantGenres(data)
        })
      );
  }

  filterData(genreFilter, stateFilter) {
    let filteredData = this.state.allRestaurantData.filter(restaurant => {
      let currentIterableRestaurantGenres = restaurant.genre.split(",");
      if (
        currentIterableRestaurantGenres.includes(genreFilter) &&
        restaurant.state === stateFilter &&
        stateFilter !== "" &&
        genreFilter !== ""
      ) {
        return restaurant;
      } else if (
        currentIterableRestaurantGenres.includes(genreFilter) &&
        stateFilter === "" &&
        genreFilter !== ""
      ) {
        return restaurant
      } else if (
        restaurant.state === stateFilter &&
        stateFilter !== "" &&
        genreFilter === ""
      ) {
        return restaurant
      } else if (
        stateFilter === "" &&
        genreFilter === ""
      ) {
        return restaurant
      }
    });
    
    this.setState({ currentFilterData: filteredData, currentSearchData: filteredData, filterOn: true });
    if (stateFilter === "" && genreFilter === "") {
      this.setState({filterOn: false})
    }
  }

  formResetTable(allData) {
    this.setState({ currentSearchData: allData });
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
          allRestaurantData={this.state.allRestaurantData}
        />
        <SearchContainer
          updateCurrentSearchData={this.updateCurrentSearchData}
          formResetTable={this.formResetTable}
          filterData={this.filterData}
          allRestaurantData={this.state.allRestaurantData}
          possibleRestaurantStates={this.state.possibleRestaurantStates}
          possibleRestaurantGenres={this.state.possibleRestaurantGenres}
        />
      </main>
    );
  }
}

export default App;
