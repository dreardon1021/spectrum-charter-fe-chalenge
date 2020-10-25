import React, { Component } from "react";
import "./FilterButtonContainer.css";
import "../App/App.css"

class FilterButtonContainer extends Component {
  constructor({ filterData, possibleRestaurantStates, possibleRestaurantGenres }) {
    super({ filterData, possibleRestaurantStates, possibleRestaurantGenres });
    this.state = {
      currentGenreFilter: '',
      currentStateFilter: ''
    };
  }

  updateFiltersOnChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.props.filterData(this.state.currentGenreFilter, this.state.currentStateFilter)
    })
  }

  render() {
    return (
      <form className="filter-form">
        <div className="genre-state-select-container">
          <label htmlFor="select-genre" className="filter-headers">
            Select Genre:
          </label>
          <select onChange={e => this.updateFiltersOnChange(e)} className="filter-select" name="currentGenreFilter">
            <option value="">No Filter</option>
            {this.props.possibleRestaurantGenres.map(genre => {
              return <option key={genre} value={genre}>{genre}</option>;
            })}
          </select>
        </div>
        <div className="genre-state-select-container">
          <label htmlFor="select-state" className="filter-headers">
            Select State:
          </label>
          <select onChange={e => this.updateFiltersOnChange(e)} className="filter-select" name="currentStateFilter">
            <option value="">No Filter</option>
            {this.props.possibleRestaurantStates.map(state => {
              return <option key={state} value={state}>{state}</option>;
            })}
          </select>
        </div>
      </form>
    );
  }
}

export default FilterButtonContainer;
