import React, { Component } from "react";
import "./FilterButtonContainer.css";
import "../App/App.css"

class FilterButtonContainer extends Component {
  constructor({ possibleRestaurantStates, possibleRestaurantGenres }) {
    super({ possibleRestaurantStates, possibleRestaurantGenres });
    this.state = {
      currentGenreFilter: null,
      currentStateFilter: null
    };
  }

  render() {
    return (
      <form className="filter-form">
        <div>
          <label for="select-genre" className="filter-headers">
            Select Genre:
          </label>
          <select className="filter-select" name="select-genre">
            <option>Please Select a Genre</option>
            {this.props.possibleRestaurantGenres.map(genre => {
              return <option>{genre}</option>;
            })}
          </select>
        </div>
        <div>
          <label for="select-genre" className="filter-headers">
            Select State:
          </label>
          <select className="filter-select" name="select-genre">
            <option>Please Select a State</option>
            {this.props.possibleRestaurantStates.map(state => {
              return <option>{state}</option>;
            })}
          </select>
        </div>
        <button className="search-filter-btn cursor-pointer" type="submit">Filter</button>
      </form>
    );
  }
}

export default FilterButtonContainer;
