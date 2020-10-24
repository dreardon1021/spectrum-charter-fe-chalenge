import React, { Component } from "react";
import "./App.css";

import Nav from "../Nav/Nav";

class App extends Component {
  constructor() {
    super();
    this.logoResetTable = this.logoResetTable.bind(this)
    this.state = {
      allRestaurantData: [],
      currentSearchData: []
    };
  }

  logoResetTable(allData) {
    this.setState({ currentSearchData: allData });
  }

  componentDidMount() {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      method: "GET",
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt"
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ allRestaurantData: data, currentSearchData: data }));
  }

  render() {
    return (
      <main>
        <Nav logoResetTable={this.logoResetTable} allRestaurantData={this.allRestaurantData} />
      </main>
    );
  }
}

export default App;
