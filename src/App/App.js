import React, { Component } from "react";
import "./App.css";

import Nav from "../Nav/Nav";
import SearchContainer from "../SearchContainer/SearchContainer";

class App extends Component {
  constructor() {
    super();
    this.logoResetTable = this.logoResetTable.bind(this);
    this.updateCurrentSearchData = this.updateCurrentSearchData.bind(this)
    this.state = {
      allRestaurantData: [],
      currentSearchData: [],
      filterByStyleOn: false,
      filterByGenreOn: false,
    };
  }

  logoResetTable(allData) {
    this.setState({ currentSearchData: allData });
  }

  updateCurrentSearchData(newSearchQuery) {
    let newCurrentSearchData = [];
    this.state.currentSearchData.forEach(resturant => {
      if (resturant.name.includes(newSearchQuery) || resturant.city.includes(newSearchQuery) || resturant.genre.includes(newSearchQuery)) {
        newCurrentSearchData.push(resturant)
      }
    })
    this.setState({currentSearchData: newCurrentSearchData})
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
        this.setState({ allRestaurantData: data, currentSearchData: data })
      );
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
        />
      </main>
    );
  }
}

export default App;
