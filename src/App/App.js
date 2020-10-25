import React, { Component } from "react";
import "./App.css";

import Nav from "../Nav/Nav";
import SearchContainer from "../SearchContainer/SearchContainer";
import { isArgumentPlaceholder } from "@babel/types";
import { all } from "q";
import { current } from "immer";

class App extends Component {
  constructor() {
    super();
    this.logoResetTable = this.logoResetTable.bind(this);
    this.updateCurrentSearchData = this.updateCurrentSearchData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.formResetTable = this.formResetTable.bind(this);
    this.state = {
      allRestaurantData: [],
      currentSearchData: [],
      currentFilterData: [],
      dataToDisplay: [],
      possibleRestaurantStates: [],
      possibleRestaurantGenres: [],
      filterOn: false,
      searchOn: false
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
          dataToDisplay: data,
          possibleRestaurantStates: this.findPossibleRestaurantStates(data),
          possibleRestaurantGenres: this.findPossibleRestaurantGenres(data)
        })
      );
  }

  adjustDisplayedData() {
    let dataToDisplay;
    if (this.state.filterOn === false && this.state.searchOn === true) {
      dataToDisplay = this.state.currentSearchData
    } else if (this.state.filterOn === true && this.state.searchOn === false) {
      dataToDisplay = this.state.currentFilterData
    } else if (this.state.searchOn === true && this.state.filterOn === true) {
      dataToDisplay = this.state.currentFilterData.filter(restaurant => {
        if (this.state.currentSearchData.includes(restaurant)) {
          return restaurant
        }
      })
    } else {
      dataToDisplay = this.state.allRestaurantData
    }
    this.setState({dataToDisplay: dataToDisplay})
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
        return restaurant;
      } else if (
        restaurant.state === stateFilter &&
        stateFilter !== "" &&
        genreFilter === ""
      ) {
        return restaurant;
      } else if (stateFilter === "" && genreFilter === "") {
        return restaurant;
      }
    });

    this.setState({
      currentFilterData: filteredData,
      filterOn: true
    }, () => {
      this.adjustDisplayedData()
    });
    if (stateFilter === "" && genreFilter === "") {
      this.setState({ filterOn: false }, () => {
        this.adjustDisplayedData()
      });
    }
  }

  formResetTable(allData) {
    this.setState({ currentSearchData: allData });
  }

  logoResetTable(allData) {
    this.setState({
      currentSearchData: allData,
      currentFilterData: allData,
      dataToDisplay: allData
    });
  }

  updateCurrentSearchData(newSearchQuery) {
    let newCurrentSearchData = [];
    this.state.allRestaurantData.forEach(resturant => {
      if (
        resturant.name.toLowerCase().match(newSearchQuery.toLowerCase()) ||
        resturant.city.toLowerCase().match(newSearchQuery.toLowerCase()) ||
        resturant.genre.toLowerCase().match(newSearchQuery.toLowerCase())
      ) {
        newCurrentSearchData.push(resturant);
      }
    });
    this.setState({ currentSearchData: newCurrentSearchData, searchOn: true }, () => {
      this.adjustDisplayedData()
    });
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
