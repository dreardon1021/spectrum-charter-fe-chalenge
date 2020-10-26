import React, { Component } from "react";
import "./App.css";

import Nav from "../Nav/Nav";
import SearchContainer from "../SearchContainer/SearchContainer";
import RestaurantTable from "../RestaurantTable/RestaurantTable";

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
      possibleRestaurantAttire: [],
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

  findPossibleRestaurantAttire(data) {
    let possibleAttire = [];
    data.forEach(restaurant => {
      let attireStr =
        restaurant.attire.charAt(0).toUpperCase() + restaurant.attire.slice(1);
      if (!possibleAttire.includes(attireStr)) {
        possibleAttire.push(attireStr);
      }
    });
    return possibleAttire;
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
          dataToDisplay: data.sort((a, b) => a.name.localeCompare(b.name)),
          possibleRestaurantStates: this.findPossibleRestaurantStates(data),
          possibleRestaurantGenres: this.findPossibleRestaurantGenres(data),
          possibleRestaurantAttire: this.findPossibleRestaurantAttire(data)
        })
      );
  }

  adjustDisplayedData() {
    let dataToDisplay;
    if (this.state.filterOn === false && this.state.searchOn === true) {
      dataToDisplay = this.state.currentSearchData;
    } else if (this.state.filterOn === true && this.state.searchOn === false) {
      dataToDisplay = this.state.currentFilterData;
    } else if (this.state.searchOn === true && this.state.filterOn === true) {
      dataToDisplay = this.state.currentFilterData.filter(restaurant => {
        if (this.state.currentSearchData.includes(restaurant)) {
          return restaurant;
        }
      });
    } else {
      dataToDisplay = this.state.allRestaurantData;
    }
    this.setState({
      dataToDisplay: dataToDisplay.sort((a, b) => a.name.localeCompare(b.name))
    });
  }

  filterData(genreFilter, stateFilter, attireFilter) {
    let filteredData = this.state.allRestaurantData.filter(restaurant => {
      let currentIterableRestaurantGenres = restaurant.genre.split(",");
      let restaurantAttire = restaurant.attire.charAt(0).toUpperCase() + restaurant.attire.slice(1);
      if (
        // all filled
        currentIterableRestaurantGenres.includes(genreFilter) &&
        restaurant.state === stateFilter &&
        restaurantAttire === attireFilter &&
        stateFilter !== "" &&
        genreFilter !== "" &&
        attireFilter !== ""
      ) {
        return restaurant;
      } else if (
        // genre only
        currentIterableRestaurantGenres.includes(genreFilter) &&
        stateFilter === "" &&
        genreFilter !== "" &&
        attireFilter === ""
      ) {
        return restaurant;
      } else if (
        // state only
        restaurant.state === stateFilter &&
        stateFilter !== "" &&
        genreFilter === "" &&
        attireFilter === ""
      ) {
        return restaurant;
      } else if (
        //attire only
        restaurantAttire === attireFilter &&
        stateFilter === "" &&
        genreFilter === "" &&
        attireFilter !== ""
      ) {
        return restaurant;
      } else if (
        //genre & state
        restaurant.state === stateFilter &&
        currentIterableRestaurantGenres.includes(genreFilter) &&
        stateFilter !== "" &&
        genreFilter !== "" &&
        attireFilter === ""
      ) {
        return restaurant;
      } else if(
        //genre & attire
        currentIterableRestaurantGenres.includes(genreFilter) &&
        restaurantAttire === attireFilter &&
        genreFilter !== "" &&
        attireFilter !== ""
      ) {
        return restaurant
      } else if (
        //state & attire
        restaurant.state === stateFilter &&
        restaurantAttire === attireFilter &&
        stateFilter !== "" &&
        attireFilter !== ""
      ) {
        return restaurant
      } else if (
        // all empty/no filter
        stateFilter === "" &&
        genreFilter === "" &&
        attireFilter === ""
      ) {
        return restaurant;
      }
    });

    this.setState(
      {
        currentFilterData: filteredData,
        filterOn: true
      },
      () => {
        this.adjustDisplayedData();
      }
    );
    if (stateFilter === "" && genreFilter === "" && attireFilter === "") {
      this.setState({ filterOn: false }, () => {
        this.adjustDisplayedData();
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
    this.setState(
      { currentSearchData: newCurrentSearchData, searchOn: true },
      () => {
        this.adjustDisplayedData();
      }
    );
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
          possibleRestaurantAttire={this.state.possibleRestaurantAttire}
        />
        <RestaurantTable dataToDisplay={this.state.dataToDisplay} />
      </main>
    );
  }
}

export default App;
